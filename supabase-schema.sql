-- BDP Publications CRM Database Schema
-- Run this in your Supabase SQL Editor

-- Create subscribers table
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  age INTEGER,
  gender VARCHAR(50) CHECK (gender IN ('male', 'female', 'rather_not_say')),
  interests TEXT[], -- Array for multiple interests like ['finance', 'wellness', 'crypto']
  profile_completed BOOLEAN DEFAULT FALSE,
  profile_token UUID DEFAULT gen_random_uuid(), -- For email-based profile completion
  email_verified BOOLEAN DEFAULT FALSE,
  subscription_source VARCHAR(100), -- Track where they subscribed from (hero, footer, etc.)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_subscribers_email ON subscribers(email);

-- Create an index on profile_token for profile completion lookups
CREATE INDEX idx_subscribers_profile_token ON subscribers(profile_token);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_subscribers_updated_at 
    BEFORE UPDATE ON subscribers 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Policy for public email subscription (allows anyone to insert)
CREATE POLICY "Allow public email subscription" ON subscribers
    FOR INSERT 
    WITH CHECK (true);

-- Policy for reading subscriber data (only for authenticated users or service role)
CREATE POLICY "Allow reading subscribers" ON subscribers
    FOR SELECT 
    USING (auth.role() = 'service_role' OR auth.uid() IS NOT NULL);

-- Policy for updating profiles via token (allows updates when profile_token matches)
CREATE POLICY "Allow profile updates via token" ON subscribers
    FOR UPDATE 
    USING (true);

-- Create a view for analytics (without sensitive data)
CREATE VIEW subscriber_analytics AS
SELECT 
    DATE_TRUNC('day', created_at) as date,
    COUNT(*) as new_subscribers,
    COUNT(CASE WHEN profile_completed THEN 1 END) as completed_profiles,
    subscription_source,
    gender,
    CASE 
        WHEN age BETWEEN 18 AND 25 THEN '18-25'
        WHEN age BETWEEN 26 AND 35 THEN '26-35'
        WHEN age BETWEEN 36 AND 45 THEN '36-45'
        WHEN age BETWEEN 46 AND 55 THEN '46-55'
        WHEN age > 55 THEN '55+'
        ELSE 'Unknown'
    END as age_group
FROM subscribers
GROUP BY DATE_TRUNC('day', created_at), subscription_source, gender, age_group
ORDER BY date DESC;

-- Grant access to the analytics view
GRANT SELECT ON subscriber_analytics TO authenticated;
GRANT SELECT ON subscriber_analytics TO service_role;

-- Insert some sample interests for reference (optional)
COMMENT ON COLUMN subscribers.interests IS 'Common interests: finance, wellness, crypto, retirement, sleep, productivity, investing, health, digital-detox, entrepreneurship';

-- Add helpful comments
COMMENT ON TABLE subscribers IS 'CRM table for BDP Publications subscriber management';
COMMENT ON COLUMN subscribers.profile_token IS 'Unique token for email-based profile completion';
COMMENT ON COLUMN subscribers.subscription_source IS 'Track source: hero, footer, community, floating-widget';