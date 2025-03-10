# Task Manager Backend API

A RESTful API for task management built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- CRUD operations for tasks
- Task status management (Pending, In Progress, Completed)
- User-specific task management
- Secure API endpoints with authentication middleware

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling for Node.js
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT implementation for authentication
- **cors**: Cross-Origin Resource Sharing middleware

## Prerequisites

- Node.js (v14.x or later)
- npm or yarn
- MongoDB (local or Atlas)

## Installation

1. Clone the repository (if not already done)
```bash
git clone <repository-url>
cd task-manager/backend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-manager
# Or use MongoDB Atlas connection string
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/task-manager
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

## Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

The API will be available at [http://localhost:5000](http://localhost:5000)

### Production Mode

```bash
npm start
# or
yarn start
```

## Project Structure

```
backend/
├── config/              # Configuration files
│   └── db.js            # MongoDB connection
├── controllers/         # Business logic
│   ├── authController.js # Authentication logic
│   └── taskController.js # Task management logic
├── middleware/          # Custom middleware
│   └── auth.js          # Authentication middleware
├── models/              # MongoDB models
│   ├── User.js          # User model
│   └── Task.js          # Task model
├── routes/              # API routes
│   ├── auth.js          # Authentication routes
│   └── tasks.js         # Task routes
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
└── server.js            # Entry point
```

## API Endpoints

### Authentication

- **POST /api/auth/register**
  - Register a new user
  - Request body: `{ username, email, password }`
  - Response: User data with JWT token

- **POST /api/auth/login**
  - Log in an existing user
  - Request body: `{ email, password }`
  - Response: User data with JWT token

- **GET /api/auth/profile**
  - Get current user profile
  - Protected route (requires authentication)
  - Response: User data

### Tasks

All task routes are protected and require authentication via JWT.

- **GET /api/tasks**
  - Get all tasks for logged in user
  - Response: Array of task objects

- **GET /api/tasks/:id**
  - Get a specific task by ID
  - Response: Task object

- **POST /api/tasks**
  - Create a new task
  - Request body: `{ title, description, status }`
  - Response: Created task object

- **PUT /api/tasks/:id**
  - Update a task
  - Request body: `{ title, description, status }`
  - Response: Updated task object

- **DELETE /api/tasks/:id**
  - Delete a task
  - Response: Success message

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. When a user registers or logs in, the server responds with a JWT token
2. For protected routes, the client should include the token in the Authorization header:
   ```
   Authorization: Bearer <token>
   ```
3. The server validates the token and grants access to the requested resource if valid

## Database Models

### User

- `username`: String (required, unique)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- `createdAt`: Date

### Task

- `title`: String (required)
- `description`: String
- `status`: String (enum: Pending, In Progress, Completed)
- `userId`: ObjectId (reference to User)
- `createdAt`: Date
- `updatedAt`: Date

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication failure
- `404 Not Found`: Resource not found
- `500 Server Error`: Server-side error

## Security Features

- Password hashing using bcrypt
- JWT authentication
- Protection against unauthorized access to tasks
- Input validation
- CORS support

## Deployment

This backend can be deployed to various cloud platforms:

- **Heroku**: Set environment variables in the Heroku dashboard
- **Render**: Configure environment variables in the Render dashboard
- **DigitalOcean**: Use App Platform or a Droplet with environment variables

## Testing with Postman

You can use Postman to test the API endpoints. Set up a collection with:

1. Environment variables:
   - `baseUrl`: http://localhost:5000/api
   - `token`: (to be set after login)

2. Authentication request:
   - POST {{baseUrl}}/auth/login
   - Store the token from the response

3. Other requests with the Authorization header:
   - Type: Bearer Token
   - Token: {{token}}