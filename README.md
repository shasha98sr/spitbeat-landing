# SpitBeat Landing Page

A Next.js landing page for SpitBeat with waitlist functionality. This project allows users to sign up for the SpitBeat waitlist and stores their information securely in a database.

## Features

- Modern, responsive landing page design
- Email waitlist signup functionality
- PostgreSQL database integration
- Environment-based configuration
- API routes for form submission

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
DATABASE_URL=your_postgresql_connection_string
```

## Database Setup

The project uses PostgreSQL. Initialize your database using the schema provided in `lib/db/schema.sql`.

## Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/components` - React components including the waitlist form
- `/pages/api` - API routes for form submission
- `/lib/db` - Database schema and configuration
- `/public` - Static assets

## Technology Stack

- [Next.js](https://nextjs.org) - React framework
- TypeScript - Type-safe JavaScript
- PostgreSQL - Database
- Tailwind CSS - Styling

## Deployment

The application can be deployed on [Vercel](https://vercel.com) or any other platform that supports Next.js applications. Make sure to configure the environment variables in your deployment platform.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
