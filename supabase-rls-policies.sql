-- SQL commands to run in Supabase SQL Editor to fix RLS policies

-- 1. Allow anonymous users to insert new subscribers (for newsletter signup)
CREATE POLICY "Allow anonymous insert subscribers"
ON subscribers
FOR INSERT
TO anon
WITH CHECK (true);

-- 2. Allow service role to do everything (for server operations)
CREATE POLICY "Allow service role all access"
ON subscribers
FOR ALL
TO service_role
WITH CHECK (true);

-- 3. Allow authenticated users to read their own data
CREATE POLICY "Allow users to read own data"
ON subscribers
FOR SELECT
TO authenticated
USING (auth.uid()::text = id::text);

-- 4. Allow users to update their own profile
CREATE POLICY "Allow users to update own profile"
ON subscribers
FOR UPDATE
TO authenticated
USING (auth.uid()::text = id::text)
WITH CHECK (auth.uid()::text = id::text);

-- Alternative: If you want to disable RLS entirely for development (LESS SECURE)
-- ALTER TABLE subscribers DISABLE ROW LEVEL SECURITY;