# 🪙 Koinsave Backend API

A Node.js + Express + TypeScript backend for a mock digital wallet system.
Implements user authentication, wallet funding, money transfers, transaction logging, and Swagger API documentation.

## This project is Docker-ready and works with an external PostgreSQL database.

### 📌 Features
- Authentication & Authorization

- User registration and login

- Password hashing using bcrypt

- JWT-based authentication

- bInput validation and error handling

- Wallet & Transactions

- Deposit money to wallet

- Send money to other users

- Prevent overdraft and double-spending

- Transaction history recorded in database

- API Documentation

- Swagger UI available at /api-docs

- Postman UI available at [https://documenter.getpostman.com/view/45496448/2sB3WvNyEo]

- Well-structured JSON responses for all endpoints

- Deployment Ready

- Uses environment variables (no hardcoded secrets)

- Dockerized for easy deployment

- rate limiting and logging middleware

## 🛠 Tech Stack
**Technology	Purpose**

Node.js + Express	Backend server
TypeScript	Type safety
PostgreSQL	Database
Prisma ORM	Database modeling & migrations
JWT	Authentication
Bcrypt	Password hashing
Swagger	API documentation
Docker	Containerization
Express-rate-limit	Basic rate limiting

## 📂 Project Structure
koinsave_ass/
│── prisma/
│   └── schema.prisma
│── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── swagger/
│   ├── app.ts
│   └── server.ts
│── .env
│── Dockerfile
│── package.json
│── tsconfig.json
│── koinsave.postman_collection.json

## ⚙️ Setup Instructions
1. Clone the repository
[git clone https://github.com/your-repo/koinsave.git]
`cd koinsave_ass`

2. Install dependencies
`npm install`

3. Configure environment variables

Create a .env file:

`DATABASE_URL="postgresql"`
`JWT_SECRET="---"`


5. Generate Prisma Client
`npx prisma generate`

6. Start the server
`npm start`



## Server runs at:
**Development**
`http://localhost:5000`

**production**
`https://koinsave-ass.onrender.com`


## Swagger documentation:
**Dev**
`http://localhost:5000/api/docs`

**Production**
`https://koinsave-ass.onrender.com/api/docs`

## 🔌 API Endpoints
**Authentication**
- Endpoint	Method	Description
`/api/auth/register	POST	Register new user`
`/api/auth/login	POST	Login user`

**Wallet**
- Endpoint	Method	Description
`/api/wallet/deposit	POST	Deposit money (auth required)`
`/api/transactions/transfer	POST	Send money to another user (auth required)`


## 🐳 Docker Setup

`docker-compose up --build`


## 📄 Swagger Documentation

**Accessible at:**
**dev**
`http://localhost:5000/api/docs`

**Production**
`https://koinsave-ass.onrender.com/api/docs`

## Postman documentation
**Accessible at**
`https://documenter.getpostman.com/view/45496448/2sB3WvNyEo`




## ✅ Summary

- This project includes:

- User registration & login with JWT

- Deposit & transfer functionality with overdraft protection

- Transaction logging

- Well-structured API responses

- Swagger documentation

- Docker support

- Rate limiting & logging (bonus)

- Ready for submission, deployment, or further development.
