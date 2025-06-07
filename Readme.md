
---

## backend --README.md`

# Book Collection App - Backend

This is the backend for the Book Collection App. It uses Node.js, Express, and MongoDB Mongoosel Atlas Compass and is deployed on 

## Deployment
The deployment is on Render :-https://book-shelf-backend-ceqs.onrender.com

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS
- dotenv
- Render for deployment

---

## Installation


cd backend
npm install


run command is 
npm run dev
which will run locally on port 5000
can check the env file
MONGODB_URI=
which is connected to my database

-- 

## Api Endpoints
 Method   Endpoint                     Description          

 GET     `/api/books`                 Get all books         
 GET     `/api/books/search?q=title`  Search books by title 
 GET     `/api/books/:id`             Get book by ObjectId  
 POST    `/api/books`                 Add a new book        

---

Push to GitHub

Connect Render to GitHub

Set MONGODB_URI in Render environment

Use start command: npm start



--------------
## Implemetented Logic

RESTful API

MongoDB integration

Search by query

CRUD operations (Create and Read implemented)