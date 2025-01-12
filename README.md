# Sports data analyser API

[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/lalankeba/recipe-share-api/blob/main/LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-green?logo=node.js)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-green?logo=mongodb)](https://www.mongodb.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)

This project is built with Node.js. It provides a simple API for managing sports data. The application supports user authentication through JSON Web Tokens (JWT), ensuring secure access to various functionalities based on user roles.

## Features

- **User Registration & Login**: Users can register for an account and log in to access their profile.
- **JWT Authentication**: Secure access to the API using JSON Web Tokens.
- **User Self-Management**: Any user can view and update their own profile information.
- **Admin Privileges**:
  - View all users. Supports pagination.
  - Change user roles.
- **Password Policies**: Enforced password complexity requirements.
- **Token Expiration**: Implemented token expiration for enhanced security.

## Installation

1. Clone the repository
2. Navigate to the project directory: `cd sportsda-api`
3. Install the required dependencies: `npm install`
4. Set up environment variables (e.g., Port, DB connection string, JWT secret). Create a `.env` file with following contents.
```
DB_URI="<connection-string>"
PORT=<desired-port>
JWT_SECRET=<secret-key>
```
5. Start the server: `npm run dev`

## Post-Installation

1. Register the first user through the API.
2. Perform database seeding to assign the ADMIN role to the first user:
   1. Access your DB instance.
   2. Find the newly registered user document in the users collection.
   3. Update the user’s roles array by adding ADMIN.

## API Endpoints

- `GET /`: Returns welcome message

### Registration and Login
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: All users login.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

For more information about the MIT License, you can visit the [MIT License page](https://opensource.org/licenses/MIT).


## Sample Requests

### Check system
```
curl http://localhost:3000/
curl http://localhost:3000/home
```
