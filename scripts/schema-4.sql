-- Create instagram_accounts table
CREATE TABLE IF NOT EXISTS instagram_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    username TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups by user_id
CREATE INDEX IF NOT EXISTS idx_instagram_accounts_user_id ON instagram_accounts(user_id);

-- Trigger for updating updated_at (assuming a trigger/function exists or creating it if needed)
-- Note: In some setups, you might need to define the function first.
-- For this script, we'll stick to the table definition and basic indexing.
