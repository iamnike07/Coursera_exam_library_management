# 📚 Book Shop API

A REST API built with **Node.js + Express** and **JWT authentication**, covering all 14 tasks.

---

## Setup

```bash
npm install
npm start           # Start the server on port 5000
npm run dev         # Start with nodemon (auto-restart)
node node_client.js # Run the Node.js client (Tasks 10–13)
```

---

## Environment Variables (`.env`)

```
PORT=5000
JWT_SECRET=your_super_secret_key_here
```

---

## API Reference

### General / Public Routes (Tasks 1–7)

#### Task 1 – Get all books
```
GET /
```
```bash
curl http://localhost:5000/
```

#### Task 2 – Get book by ISBN
```
GET /isbn/:isbn
```
```bash
curl http://localhost:5000/isbn/978-0-06-112008-4
```

#### Task 3 – Get books by Author
```
GET /author/:author
```
```bash
curl http://localhost:5000/author/Harper%20Lee
```

#### Task 4 – Get books by Title
```
GET /title/:title
```
```bash
curl http://localhost:5000/title/Great%20Gatsby
```

#### Task 5 – Get book reviews
```
GET /review/:isbn
```
```bash
curl http://localhost:5000/review/978-0-06-112008-4
```

#### Task 6 – Register a new user
```
POST /register
Body: { "username": "john", "password": "pass123" }
```
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"pass123"}'
```

#### Task 7 – Login
```
POST /login
Body: { "username": "john", "password": "pass123" }
Returns: { "token": "<JWT>" }
```
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"pass123"}'
```

---

### Authenticated Routes (Tasks 8–9)
> Include `Authorization: Bearer <token>` header.

#### Task 8 – Add / Modify a book review
```
PUT /customer/auth/review/:isbn?review=<text>
```
```bash
curl -X PUT "http://localhost:5000/customer/auth/review/978-0-06-112008-4?review=Excellent%20read!" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Task 9 – Delete a book review
```
DELETE /customer/auth/review/:isbn
```
```bash
curl -X DELETE http://localhost:5000/customer/auth/review/978-0-06-112008-4 \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

---

### Node.js Client (Tasks 10–13)

| Task | Method | Description |
|------|--------|-------------|
| 10 | async/await | Get all books |
| 11 | Promise `.then()` | Search by ISBN |
| 12 | async/await | Search by Author |
| 13 | Promise `.then()` | Search by Title |

Run with:
```bash
node node_client.js
```

---

## Project Structure

```
bookshop/
├── index.js              # Express app entry point
├── node_client.js        # Node.js Axios client (Tasks 10–13)
├── package.json
├── .env
└── router/
    ├── booksdb.js        # In-memory book data
    ├── general.js        # Public routes (Tasks 1–7)
    └── auth_users.js     # Protected routes (Tasks 8–9)
```
