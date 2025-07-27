# Authentication Module

This module provides session-based authentication with signup, login, and logout functionality.

## Features

- ✅ User registration with validation
- ✅ User login with session management
- ✅ User logout with session destruction
- ✅ Password hashing with bcrypt
- ✅ Input validation with Zod
- ✅ Session-based authentication
- ✅ Protected routes middleware

## API Endpoints

### Public Routes (No Authentication Required)

#### POST `/api/auth/signup`

Register a new user.

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```

**Validation Rules:**

- `firstName`: 2-50 characters
- `lastName`: 2-50 characters
- `email`: Valid email format
- `password`: Minimum 8 characters, must contain lowercase, uppercase, and number

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com"
    }
  }
}
```

#### POST `/api/auth/login`

Login with existing credentials.

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com"
    }
  }
}
```

### Protected Routes (Authentication Required)

#### POST `/api/auth/logout`

Logout and destroy session.

**Response:**

```json
{
  "success": true,
  "message": "Logout successful"
}
```

#### GET `/api/auth/profile`

Get current user profile.

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com"
    }
  }
}
```

## Error Responses

### Validation Errors (400)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### Authentication Errors (401)

```json
{
  "success": false,
  "message": "Authentication required"
}
```

### Already Authenticated (403)

```json
{
  "success": false,
  "message": "Already authenticated"
}
```

## Session Configuration

The session is configured with the following settings:

- **Secret**: Uses `SESSION_SECRET` environment variable or fallback
- **Cookie**: HTTP-only, secure in production
- **Max Age**: 24 hours
- **Resave**: false
- **Save Uninitialized**: false

## Database Schema

The User model includes:

- `id`: Auto-incrementing primary key
- `firstName`: User's first name
- `lastName`: User's last name
- `email`: Unique email address
- `password`: Hashed password
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

## Security Features

- Password hashing with bcrypt (12 salt rounds)
- Session-based authentication
- Input validation and sanitization
- HTTP-only cookies
- Secure cookies in production
- Protection against duplicate registrations
