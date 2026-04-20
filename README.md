
# Login System Frontend

React 18 frontend for the simple login authentication system.

## Tech Stack

- **React 18** — UI component library
- **TypeScript** — Type-safe JavaScript
- **Vite** — Fast build tool and dev server
- **Axios** — HTTP client for API calls
- **React Router DOM** — Client-side routing
- **TailwindCSS** — Utility-first CSS framework

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Backend API running on http://localhost:8000

## Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Configure environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your backend API URL
```

## Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will start at http://localhost:5173

## Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Built files will be in the `dist/` directory.

Preview production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── main.tsx              # Application entry point
│   ├── App.tsx               # Root component with routing
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx    # Top navigation bar
│   │   │   ├── PageLayout.tsx # Page wrapper component
│   │   │   └── ErrorBoundary.tsx # Error boundary wrapper
│   │   └── common/
│   │       └── LoadingSpinner.tsx # Loading state component
│   ├── pages/
│   │   ├── LoginPage.tsx     # Login page (EmailID + Password + Login button)
│   │   └── WelcomePage.tsx   # Welcome page ('Welcome to Login Website')
│   ├── services/
│   │   ├── api.ts            # Axios base client
│   │   └── auth.service.ts   # Authentication API service
│   ├── types/
│   │   └── auth.types.ts     # TypeScript type definitions
│   └── utils/
│       └── validation.ts     # Input validation utilities
├── public/                   # Static assets
├── index.html                # HTML entry point
├── package.json              # npm dependencies
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── tailwind.config.js        # TailwindCSS configuration
```

## Required Environment Variables

Create a `.env.local` file with:

```env
VITE_API_URL=http://localhost:8000
```

## Features Implemented

- ✅ Login page as landing page (FR-001)
- ✅ EmailID and Password input fields with validation (FR-001, NFR-003)
- ✅ Password input masking (NFR-001)
- ✅ Login button submission (FR-002)
- ✅ Client-side email format validation (NFR-003)
- ✅ Generic error messages on auth failure (NFR-003)
- ✅ Redirect to welcome page on success (FR-004)
- ✅ Protected route for welcome page (API contract)
- ✅ JWT token storage and automatic header injection
- ✅ Cross-browser compatible UI (NFR-004)
- ✅ Loading states and error handling
- ✅ Responsive design

## Authentication Flow

1. User visits the application → redirected to `/` (login page)
2. User enters EmailID and Password
3. Client validates email format and non-empty password
4. On submit, POST request to `/api/v1/login` with credentials
5. Backend validates credentials against PostgreSQL login_user table
6. On success:
   - Backend creates session in user_session table
   - Returns JWT token containing session_id
   - Frontend stores token in localStorage
   - Frontend redirects to `/welcome`
7. On failure:
   - Backend returns generic error message (per NFR-003)
   - Frontend displays error without revealing which field failed
8. Welcome page (`/welcome`) is protected:
   - Requires valid JWT token in Authorization header
   - Token validated against active session in database
   - If invalid/expired, user redirected back to login

## Browser Compatibility

Tested and verified on:
- Google Chrome 120+
- Mozilla Firefox 121+
- Microsoft Edge 120+

## Performance

- Login page loads in under 3 seconds (per NFR-002)
- Optimized production build with code splitting
- Lazy loading for routes
