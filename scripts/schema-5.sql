-- Create user_apps table for sidebar preferences
CREATE TABLE IF NOT EXISTS user_apps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    app_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, app_id)
);

-- Index for faster lookups by user_id
CREATE INDEX IF NOT EXISTS idx_user_apps_user_id ON user_apps(user_id);
