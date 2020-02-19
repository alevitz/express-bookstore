const request = require("jest");
const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

process.env.NODE_ENV = "test"

let book_isbn;

describe('Books Routes Test', async function () {

  beforeEach(async function () {
    await db.query('DELETE FROM books');

    let result = await db.query(`
      INSERT INTO (isbn, amazon_url, author, language, pages, publisher, title, year)
      VALUES ("03485039485", "http://a.co/eobPtX2", "Matt L", "english", 900, "test publisher", "test book1", 2020)
    `)

    book_isbn = result.rows[0].isbn;
  });


  // let b1 = await Book.create({
  //   isbn: "0691161518",
  //   amazon_url: "http://a.co/eobPtX2",
  //   author: "Matthew Lane",
  //   language: "english",
  //   pages: 264,
  //   publisher: "Princeton University Press",
  //   title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
  //   year: 2017
  // });
  test('can get all books', async function () {
    const getBooksResponse = await request(app).get(`/books`);

    expect(getBooksResponse.body[0]).toEqual({
      isbn: "0691161518",
      amazon_url: "http://a.co/eobPtX2",
      author: "Matthew Lane",
      language: "english",
      pages: 264,
      publisher: "Princeton University Press",
      title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      year: 2017
    });
    expect(getBooksResponse.body).toHaveLength(1);

  });

});


afterAll(async function () {
  await db.end()
});