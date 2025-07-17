# Campus Connect Backend

A production-ready Node.js TypeScript backend API for Campus Connect platform.

## Features

- **TypeScript** - Type-safe development
- **Express.js** - Fast, unopinionated web framework
- **Security** - Helmet, CORS, Rate limiting
- **Error Handling** - Centralized error management
- **Environment Config** - Environment-based configuration
- **Linting** - ESLint with TypeScript rules
- **Testing** - Jest testing framework
- **Docker** - Containerization ready

## Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues
npm test           # Run tests
npm run test:watch # Run tests in watch mode
```

## API Endpoints

### Health Check
- **GET** `/api/v1/health` - Service health status

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 3000 |
| API_VERSION | API version | v1 |

## Docker

```bash
# Build image
docker build -t campus-connect-backend .

# Run container
docker run -p 8080:8080 campus-connect-backend
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── routes/         # API routes
├── types/          # TypeScript type definitions
├── app.ts          # Express app setup
└── index.ts        # Application entry point
```
