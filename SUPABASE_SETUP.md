# 🗄️ Supabase Setup Instructions for BDP Publications CRM

## Step 1: Execute SQL Schema

1. **Open your Supabase dashboard** at https://supabase.com/dashboard
2. **Navigate to SQL Editor** (left sidebar)
3. **Copy and paste** the entire content from `supabase-schema.sql` 
4. **Click "RUN"** to execute the schema

This will create:
- ✅ `subscribers` table with all necessary columns
- ✅ Database indexes for performance
- ✅ Row Level Security (RLS) policies
- ✅ Automatic timestamp updates
- ✅ Analytics view for reporting

## Step 2: Configure Environment Variables

1. **Copy `.env.example` to `.env.local`**:
   ```bash
   cp .env.example .env.local
   ```

2. **Get your Supabase keys**:
   - Go to Settings → API in your Supabase dashboard
   - Copy your **Project URL** and **anon public key**
   - Copy your **service_role key** (⚠️ Keep this secret!)

3. **Update `.env.local`** with your actual values:
   ```bash
   # Replace these with your actual Supabase values
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key
   
   # SendGrid (we'll configure this next)
   SENDGRID_API_KEY=SG.your-sendgrid-key
   SENDGRID_FROM_EMAIL=noreply@bdppublications.com
   SENDGRID_FROM_NAME=BDP Publications
   
   # Your app URL
   NEXT_PUBLIC_BASE_URL=http://localhost:8080
   ```

## Step 3: Verify Database Setup

Let's test if everything is working by running a quick verification:

1. **Check table creation**:
   ```sql
   SELECT table_name, column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'subscribers'
   ORDER BY ordinal_position;
   ```

2. **Test a sample insert** (optional):
   ```sql
   INSERT INTO subscribers (email, subscription_source) 
   VALUES ('test@example.com', 'setup-test');
   
   SELECT * FROM subscribers WHERE email = 'test@example.com';
   
   -- Clean up test data
   DELETE FROM subscribers WHERE email = 'test@example.com';
   ```

## Step 4: Security Verification

Confirm your RLS policies are active:

```sql
-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'subscribers';

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'subscribers';
```

## Expected Database Schema

Your `subscribers` table should have these columns:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `email` | VARCHAR(255) | Unique email address |
| `name` | VARCHAR(255) | Optional subscriber name |
| `age` | INTEGER | Optional age |
| `gender` | VARCHAR(50) | male/female/rather_not_say |
| `interests` | TEXT[] | Array of interests |
| `profile_completed` | BOOLEAN | Default: false |
| `profile_token` | UUID | For email-based completion |
| `email_verified` | BOOLEAN | Default: false |
| `subscription_source` | VARCHAR(100) | Tracking source |
| `created_at` | TIMESTAMP | Auto-generated |
| `updated_at` | TIMESTAMP | Auto-updated |

## Troubleshooting

**If you get permission errors:**
- Make sure RLS is properly configured
- Verify your service role key is correct
- Check that policies are created correctly

**If schema creation fails:**
- Run each section separately (table, indexes, policies)
- Check for any existing tables with the same name
- Verify you have admin access to your Supabase project

## Next Steps

Once this is complete, we'll move on to:
1. ✅ Configure SendGrid for email sending
2. ✅ Create API endpoints for subscription handling
3. ✅ Build the UI components

---

**🚨 Security Reminder**: Never commit your `.env.local` file to git. It's already in `.gitignore`, but double-check!