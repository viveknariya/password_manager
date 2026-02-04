# Plan: Implement Auth-Based App Init with Dashboard Redirect

## Overview

Create an `AppInitProvider` that validates the JWT token on app load. If valid, store user data and redirect to dashboard. If invalid, clear the cookie and show login. Add a dashboard button to the login screen. Since the app uses Jotai, we'll use Jotai for global auth state and a middleware file to protect routes.

## Implementation Steps

### 1. Create Auth Context Provider

**File:** `lib/store.ts`

- Store user data, loading state, and auth methods globally using Jotai atom
- Provide hooks for accessing auth state throughout the app
- Handle token validation and user data persistence

### 3. Create AppInitProvider

**File:** `app/providers/app-init.tsx`

- Similar to the example provided
- Fetches user from `/api/auth/me` endpoint on app load
- Sets loading state while validating
- Shows page loader during initialization
- Handles token validation errors gracefully

### 4. Create /api/auth/me Endpoint

**File:** `app/api/auth/me/route.ts`

- Returns current user data if token is valid
- Returns 401 if invalid/expired
- Uses existing `withAuth` wrapper to verify token
- Extracts user email from verified token and fetches full user data from DB

### 5. Update Root Layout

**File:** `app/layout.tsx`

- Wrap children with `AppInitProvider`
- Wrap with `AuthProvider` (auth context provider)
- Initialize global auth state and user data

### 6. Update Login Page

**File:** `components/login-form.tsx`

- Add button/link to redirect to dashboard if already logged in
- Show confirmation message like "Already logged in? Go to Dashboard"
- Conditionally render based on auth context state

## Key Architectural Decisions

### Store Choice

- **Current Status:** App has no state management library (no Jotai/Zustand installed)
- **Recommendation:** Use React Context + localStorage for persistence
- **Alternative:** Add Jotai if complex state sharing needed across many components

### Protection Level

- **Middleware Approach:** Catches all routes at request level - most secure
- **Layout Approach:** Individual page layout protection - simpler to implement
- **Recommendation:** Combination - middleware for token validation, layout for UI rendering

### Error Handling

- **Token Invalid:** Show toast notification + redirect to login
- **Network Error:** Show error message + retry option
- **Session Expired:** Silently redirect to login with message on login page

## Current App State Analysis

### Existing Auth Flow

- OTP-based login (email → OTP code → JWT)
- JWT stored in httpOnly, secure cookie (7-day expiry)
- Token verified in individual routes using `withAuth` wrapper
- No centralized middleware protection

### Database & Services

- PostgreSQL via node-postgres driver
- ZeptoMail API for email (OTP delivery)
- User model includes: id, email, first_name, last_name, stripe_customer_id, dates

## Implementation Order (Recommended)

1. Create `/api/auth/me` endpoint ← easiest, foundation for init
2. Create jotai atom (`lib/store.ts`)
3. Create `AppInitProvider` (`app/providers/app-init.tsx`)
4. Update root layout with providers
5. Update login form with dashboard redirect
6. Add protection to app layout

## Testing Checklist

- [ ] Valid token on app load → shows dashboard redirect button
- [ ] Invalid token on app load → redirects to login, clears cookie
- [ ] Expired token on logout → cookie deleted, redirected to login
- [ ] Access `/app/*` without token → redirects to login
- [ ] Access `/login` with valid token → redirects to dashboard
- [ ] Page loader shows during token verification
- [ ] User data loads from API and displays correctly
- [ ] Navigation between protected routes works
- [ ] Mobile responsive behavior maintained
