This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Buyer & Seller Auth System
A user authentication system with Buyer and Seller roles, built with Python, Next.js, React, and TensorFlow.

## Project Structure
- `backend/`: Python (FastAPI) API for authentication.
- `frontend/`: Next.js + React for the user interface.

## Setup
1. **Backend**:
   - Navigate to `backend/`.
   - Create a virtual environment: `python -m venv venv`.
   - Install dependencies: `pip install -r requirements.txt`.
   - Run: `uvicorn main:app --reload`.

2. **Frontend**:
   - Navigate to `frontend/`.
   - Install dependencies: `npm install`.
   - Run: `npm run dev`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Role-Based Architecture
- **Buyers**: Browse products, add to cart, purchase.
- **Sellers**: Create/edit product listings, view sales.
- **Implementation**:
  - Store role (‘buyer’ or ‘seller’) in PostgreSQL `users` table.
  - FastAPI verifies role using JWT for restricted endpoints.
  - Next.js frontend shows role-specific UI (e.g., Seller dashboard).

  ## Module 2: Designing the Authentication System
- **Database**: PostgreSQL with `users` table (`schema.sql`).
- **Role-Based Architecture**: Buyer/Seller roles stored in `role` column, used for access control.
- **API Endpoints**: Planned in `backend/api_design.md` (`/register`, `/login`, `/me`, `/logout`) using FastAPI.
