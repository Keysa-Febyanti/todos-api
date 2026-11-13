# API Endpoint Design
## Project: Todos-List Management

## 1. Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/auth/register | Public | Register a new user |
| POST | /api/auth/login | Public | Login and receive JWT token |
| GET | /api/auth/me | Authenticated | Get current user profile |

## 2. Todo Management

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /api/todos | Authenticated | Get user's todo list |
| GET | /api/todos/:id | Authenticated | Get todo details |
| POST | /api/todos | Authenticated | Create a todo |
| PUT | /api/todos/:id | Owner | Update a todo |
| DELETE | /api/todos/:id | Owner | Delete a todo |

## 3. Category Management

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /api/categories | Authenticated | Get user's categories |
| GET | /api/categories/:id | Authenticated | Get category details |
| POST | /api/categories | Authenticated | Create a category |
| PUT | /api/categories/:id | Owner | Update a category |
| DELETE | /api/categories/:id | Owner | Delete a category |

## 4. Activity Log

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /api/activity-logs | Authenticated | View user's activity history |

## 5. Access Rules

- Public endpoints can be accessed without login.
- Authenticated endpoints require a valid JWT token.
- Users can only access and modify their own todos and categories.
- Activity logs are accessible only to the user they belong to.
- Passwords must be hashed before being stored.
- Input data must be validated before processing.
- Unauthorized requests return HTTP 401.
- Forbidden requests return HTTP 403.
- Missing resources return HTTP 404.