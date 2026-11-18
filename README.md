# Web Back Assignment

A backend REST API built using Node.js, Express and MongoDB as part of the Web Programming course.

## Getting Started

```bash
npm install
```

Create a `.env` file in the root:
```
MONGO_URI=your_mongodb_connection_string
PORT=8000
```

```bash
npm start
```

## API Endpoints

### Users
| Method | Endpoint | What it does |
|--------|----------|--------------|
| POST | /api/v1/users/register | Create a new user account |
| POST | /api/v1/users/login | Login to existing account |
| GET | /api/v1/users | Fetch all users |

### Posts
| Method | Endpoint | What it does |
|--------|----------|--------------|
| POST | /api/v1/posts | Create a new post |
| GET | /api/v1/posts | Get all posts |
| GET | /api/v1/posts/:id | Get one post by ID |
| PUT | /api/v1/posts/:id | Update a post |
| DELETE | /api/v1/posts/:id | Delete a post |
