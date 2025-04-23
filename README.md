# CareConnect - Healthcare Management System

## Project Overview

CareConnect is a comprehensive healthcare management system designed to simplify the healthcare experience for patients. The platform allows users to manage appointments, access medical documents, and handle billing in one centralized location.

## Table of Contents

- [CareConnect - Healthcare Management System](#careconnect---healthcare-management-system)
  - [Project Overview](#project-overview)
  - [Table of Contents](#table-of-contents)
  - [Architecture](#architecture)
  - [Directory Structure](#directory-structure)
  - [Key Features](#key-features)
  - [Authentication Flow](#authentication-flow)
  - [Database Schema](#database-schema)
    - [Users Table](#users-table)
    - [Documents Table](#documents-table)
    - [Appointments Table](#appointments-table)
  - [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [User Profile](#user-profile)
    - [Appointments](#appointments)
    - [Documents](#documents)
  - [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Production Build](#production-build)
  - [Environment Variables](#environment-variables)
  - [Testing](#testing)
    - [Running Tests](#running-tests)
  - [Deployment](#deployment)
    - [Docker Deployment](#docker-deployment)
    - [Vercel Deployment](#vercel-deployment)
  - [License](#license)

## Architecture

CareConnect is built using the following technologies:

- **Frontend & Backend**: Next.js 13+ (App Router)
- **Database**: MariaDB (MySQL)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS
- **Testing**: Jest and React Testing Library
- **Containerization**: Docker

The application follows a modern full-stack architecture where Next.js handles both the frontend UI and backend API routes. The App Router pattern is used for routing, with server components for data fetching and client components for interactivity.

## Directory Structure

```
careconnect/
├── app/                # Next.js App Router directory
│ ├── api/              # API routes
│ │ ├── auth/           # Authentication endpoints
│ │ ├── appointments/   # Appointment management endpoints
│ │ └── user/           # User profile endpoints
│ ├── dashboard/        # Dashboard pages
│ ├── login/            # Login page
│ ├── registro/         # Registration pages
│ ├── profile/          # User profile page
│ ├── layout.tsx        # Root layout
│ └── page.tsx          # Landing page
├── components/         # Reusable React components
│ ├── ui/               # UI components (buttons, cards, etc.)
│ ├── login-form.tsx    # Login form component
│ └── register-form.tsx # Registration form component
├── lib/                # Utility functions and libraries
│ ├── db.ts             # Database connection
│ ├── jwt.ts            # JWT authentication utilities
│ └── utils.ts          # General utility functions
├── models/             # Database models
│ ├── appointment.ts    # Appointment model
│ └── document.ts       # Document model
├── public/             # Static assets
├── __tests__/          # Test files
├── db/                 # Database initialization scripts
├── uploads/            # File upload directory
├── middleware.ts       # Next.js middleware for auth
├── next.config.mjs     # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── jest.config.js      # Jest configuration
├── jest.setup.js       # Jest setup file
├── package.json        # Project dependencies
└── docker-compose.yml  # Docker configuration
```

## Key Features

1. **User Authentication**

   - Registration with document upload
   - Login/Logout
   - Password reset

2. **Appointment Management**

   - Schedule new appointments
   - View upcoming appointments
   - Reschedule or cancel appointments

3. **Document Management**

   - Upload medical documents
   - View and download documents
   - Organize documents by type

4. **Billing and Payments**

   - View account status
   - Check payment history
   - Download invoices

5. **User Profile**
   - Update personal information
   - Change password
   - Manage account settings

## Authentication Flow

1. **Registration**:

   - User fills out registration form (Step 1)
   - User uploads required documents (Step 2)
   - Account is created and user is redirected to login

2. **Login**:

   - User enters credentials
   - Server validates credentials and issues JWT token
   - Token is stored in HTTP-only cookie
   - User is redirected to dashboard

3. **Authentication Check**:

   - Middleware checks for valid JWT token on protected routes
   - If token is invalid or missing, user is redirected to login
   - If token is valid, request proceeds

4. **Password Reset**:
   - User requests password reset with cédula
   - Reset token is generated and (in production) sent via email
   - User enters token and new password
   - Password is updated in database

## Database Schema

### Users Table

- `id`: INT (Primary Key)
- `cedula`: VARCHAR(20) (Unique)
- `password`: VARCHAR(255) (Hashed)
- `nombre`: VARCHAR(100)
- `apellido`: VARCHAR(100)
- `fecha_de_nacimiento`: DATE
- `email`: VARCHAR(100) (Unique)
- `reset_token`: VARCHAR(255) (Nullable)
- `reset_expires`: DATETIME (Nullable)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### Documents Table

- `id`: INT (Primary Key)
- `user_id`: INT (Foreign Key to Users)
- `file_name`: VARCHAR(255)
- `file_path`: VARCHAR(255)
- `file_type`: VARCHAR(50)
- `file_size`: INT
- `mime_type`: VARCHAR(100)
- `created_at`: TIMESTAMP

### Appointments Table

- `id`: INT (Primary Key)
- `user_id`: INT (Foreign Key to Users)
- `specialty`: VARCHAR(100)
- `date`: DATE
- `time`: VARCHAR(20)
- `doctor`: VARCHAR(100)
- `reason`: TEXT
- `status`: ENUM('pending', 'confirmed', 'cancelled')
- `tracking_number`: VARCHAR(20)
- `created_at`: TIMESTAMP

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate user and issue JWT
- `GET /api/auth/logout`: Clear authentication cookie
- `POST /api/auth/request-reset`: Request password reset
- `POST /api/auth/reset-password`: Reset password with token

### User Profile

- `GET /api/user/profile`: Get user profile information
- `PUT /api/user/profile`: Update user profile
- `POST /api/user/change-password`: Change user password

### Appointments

- `GET /api/appointments`: Get user appointments
- `POST /api/appointments`: Create new appointment
- `PUT /api/appointments/[id]`: Update appointment status

### Documents

- `POST /api/upload-documents`: Upload user documents

## Setup Instructions

### Prerequisites

- Node.js 16+
- Docker and Docker Compose (for database)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/careconnect.git
   cd careconnect
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.local.example .env.local

   # Edit .env.local with your configuration
   ```

4. Start the database:

   ```bash
   docker-compose up -d
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Environment Variables

| Variable              | Description           | Default               |
| --------------------- | --------------------- | --------------------- |
| `DB_HOST`             | Database host         | localhost             |
| `DB_PORT`             | Database port         | 3306                  |
| `DB_USER`             | Database username     | care_connect_user     |
| `DB_PASSWORD`         | Database password     | Admin123              |
| `DB_NAME`             | Database name         | care_connect          |
| `JWT_SECRET`          | Secret key for JWT    | your-secret-key       |
| `NEXT_PUBLIC_APP_URL` | Public URL of the app | http://localhost:3000 |

## Testing

The project includes unit and integration tests using Jest and React Testing Library.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Deployment

### Docker Deployment

The project includes a Dockerfile for containerized deployment:

```bash
# Build the Docker image
docker build -t careconnect .

# Run the container
docker run -p 3000:3000 careconnect
```

### Vercel Deployment

The project is optimized for deployment on Vercel:

1. Push your code to a Git repository
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
