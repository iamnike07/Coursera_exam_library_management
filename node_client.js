/**
 * node_client.js
 * Tasks 10–13: Axios-based client using async/await and Promises
 * Run: node node_client.js
 */

const axios = require("axios");

const BASE_URL = "http://localhost:5000";

// ─── Task 10: Get all books – async/await ─────────────────────────────────────
async function getAllBooks() {
  console.log("\n── Task 10: Get all books (async/await) ──────────────────");
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log("Books fetched successfully:");
    const books = response.data.books;
    Object.values(books).forEach((b) =>
      console.log(`  [${b.isbn}] "${b.title}" by ${b.author}`)
    );
  } catch (error) {
    console.error("Error fetching books:", error.message);
  }
}

// ─── Task 11: Search by ISBN – Promises ───────────────────────────────────────
function searchByISBN(isbn) {
  console.log(`\n── Task 11: Search by ISBN (Promises) ────────────────────`);
  console.log(`Searching for ISBN: ${isbn}`);

  return axios
    .get(`${BASE_URL}/isbn/${isbn}`)
    .then((response) => {
      const book = response.data;
      console.log("Book found:");
      console.log(`  Title  : ${book.title}`);
      console.log(`  Author : ${book.author}`);
      console.log(`  ISBN   : ${book.isbn}`);
      return book;
    })
    .catch((error) => {
      if (error.response) {
        console.error(`Not found: ${error.response.data.message}`);
      } else {
        console.error("Error:", error.message);
      }
    });
}

// ─── Task 12: Search by Author – async/await ─────────────────────────────────
async function searchByAuthor(author) {
  console.log(`\n── Task 12: Search by Author (async/await) ───────────────`);
  console.log(`Searching for author: "${author}"`);
  try {
    const response = await axios.get(
      `${BASE_URL}/author/${encodeURIComponent(author)}`
    );
    const books = response.data.books;
    console.log(`Found ${books.length} book(s):`);
    books.forEach((b) => console.log(`  "${b.title}" (${b.isbn})`));
    return books;
  } catch (error) {
    if (error.response) {
      console.error(`Not found: ${error.response.data.message}`);
    } else {
      console.error("Error:", error.message);
    }
  }
}

// ─── Task 13: Search by Title – Promises ──────────────────────────────────────
function searchByTitle(title) {
  console.log(`\n── Task 13: Search by Title (Promises) ───────────────────`);
  console.log(`Searching for title containing: "${title}"`);

  return axios
    .get(`${BASE_URL}/title/${encodeURIComponent(title)}`)
    .then((response) => {
      const books = response.data.books;
      console.log(`Found ${books.length} book(s):`);
      books.forEach((b) =>
        console.log(`  "${b.title}" by ${b.author} (${b.isbn})`)
      );
      return books;
    })
    .catch((error) => {
      if (error.response) {
        console.error(`Not found: ${error.response.data.message}`);
      } else {
        console.error("Error:", error.message);
      }
    });
}

// ─── Run all tasks sequentially ───────────────────────────────────────────────
(async () => {
  console.log("=".repeat(60));
  console.log(" Node.js Client – Book Shop API (Tasks 10–13)");
  console.log("=".repeat(60));

  await getAllBooks();                             // Task 10
  await searchByISBN("978-0-06-112008-4");        // Task 11
  await searchByAuthor("Harper Lee");             // Task 12
  await searchByTitle("Harry Potter");            // Task 13

  console.log("\n" + "=".repeat(60));
  console.log(" All tasks completed.");
  console.log("=".repeat(60));
})();
