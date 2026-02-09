-- Create app_accounts table (generic accounts for all apps)
CREATE TABLE IF NOT EXISTS app_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    app_id TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    username TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster lookups by user_id and app_id
CREATE INDEX IF NOT EXISTS idx_app_accounts_user_id ON app_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_app_accounts_user_id_app_id ON app_accounts(user_id, app_id);

-- Trigger for updating updated_at (assuming a trigger/function exists or creating it if needed)
-- Note: In some setups, you might need to define the function first.
-- For this script, we'll stick to the table definition and basic indexing.
