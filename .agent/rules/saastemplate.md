---
trigger: always_on
---

1. Frontend: Route Groups for Logic Separation: Inside the app directory, we use folders with parentheses (e.g., (app), (landing-page)) not for URL paths, but to group routes that share specific layouts or middleware requirements. This prevents "layout bleeding"—where a sidebar from the dashboard accidentally shows up on the marketing home page.
Component Modularity: The components directory is the engine room of the UI. Focus on building "dumb" components that receive data via props and "smart" components that handle state. By keeping UI elements atomic (small and single-purpose), we ensure that a button or form field looks and behaves identically across every page.
2. The lib Layer as the Source of Truth: Never write complex business logic (like calculating a subscription end date or validating an OTP) directly inside an API route handler. Instead, move that logic into the lib folder. This makes your code DRY (Don't Repeat Yourself) and allows the same logic to be called by both Server Actions and API Routes.
Standardized API Responses: To prevent frontend crashes, every single API endpoint must return the same JSON shape (e.g., { success: boolean, message: string, data?: T }). This allows the frontend to use a single, unified method for handling success messages and displaying error toasts.
3. Centralized Type Definitions: By keeping all interfaces in a dedicated types folder (like 
lib/types.ts), we create a "contract" between the database and the UI. If a column name changes in the database, updating it in the centralized types file will immediately highlight every single place in the frontend or backend that needs to be fixed.End-to-End Safety: This approach ensures that when you fetch a User or Billing object from the database, the IDE knows exactly which fields exist, what their types are (string, Date, etc.), and whether they are optional. This eliminates "undefined" errors and makes refactoring much safer.
