# AlumConnect Backend API

Backend API for the AlumConnect alumni-student networking platform.

## Features

- User authentication with JWT
- Role-based access control (student, alumnus, admin)
- CRUD operations for user profiles
- Alumni profile management
- Social feed with posts, likes, and comments
- MongoDB database integration

## Tech Stack

- Node.js + Express
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- Docker for local development

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (or use Docker)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
5. Update the `.env` file with your configuration

### Running with Docker (Recommended for development)

1. Start MongoDB and Mongo Express:
   ```bash
   docker-compose up -d
   ```
2. Start the Node.js server:
   ```bash
   npm run dev
   ```

### Running without Docker

1. Make sure MongoDB is running locally
2. Start the Node.js server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user details

### Users

- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users` - Delete user account

### Alumni

- `GET /api/alumni` - Get all alumni
- `POST /api/alumni` - Create alumni profile
- `GET /api/alumni/profile` - Get current user's alumni profile
- `PUT /api/alumni/profile` - Update alumni profile
- `DELETE /api/alumni/profile` - Delete alumni profile

### Posts

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get a specific post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post
- `PUT /api/posts/like/:id` - Like a post
- `PUT /api/posts/unlike/:id` - Unlike a post
- `POST /api/posts/comment/:id` - Comment on a post
- `DELETE /api/posts/comment/:id/:comment_id` - Delete a comment

## Example Requests

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Alumni Profile
```bash
curl -X POST http://localhost:5000/api/alumni \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "graduationYear": 2020,
    "degree": "B.Tech",
    "major": "Computer Science",
    "currentPosition": "Software Engineer",
    "company": "Tech Corp",
    "industry": "Technology",
    "location": "San Francisco, CA",
    "bio": "Passionate software engineer with 3 years of experience.",
    "skills": ["JavaScript", "React", "Node.js"],
    "linkedIn": "https://linkedin.com/in/johndoe",
    "isMentor": true,
    "availability": "Available"
  }'
```

### Create a Post
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "text": "Just graduated! Looking forward to connecting with fellow alumni.",
    "media": "https://example.com/image.jpg"
  }'
```

## Environment Variables

- `NODE_ENV` - Node environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token signing
- `CLIENT_URL` - Frontend URL for CORS (default: http://localhost:5173)

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── alumniControllerNew.js
│   │   └── postController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Alumni.js
│   │   ├── Student.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── alumniRoutesNew.js
│   │   └── postRoutes.js
│   └── server.js
├── .env
├── .gitignore
├── docker-compose.yml
├── package.json
└── README.md
```

## Development

1. Make sure all dependencies are installed
2. Start the development server:
   ```bash
   npm run dev
   ```
3. The API will be available at `http://localhost:5000`

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Update the `MONGO_URI` to point to your production database
3. Set a strong `JWT_SECRET`
4. Start the server:
   ```bash
   npm start
   ```