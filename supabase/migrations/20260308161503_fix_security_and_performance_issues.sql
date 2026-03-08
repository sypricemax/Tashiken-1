/*
  # Fix Security and Performance Issues

  ## Performance Improvements
  1. Add missing indexes on foreign key columns
    - Add index on `syllabus.belt_id` for faster joins with belts table
    - Add index on `videos.belt_id` for faster joins with belts table

  ## Security Improvements
  2. Fix overly permissive RLS policies on glossary_terms
    - Remove policies that allow unrestricted INSERT/UPDATE/DELETE for all authenticated users
    - Current policies allow any authenticated user to modify/delete all glossary terms
    - Since this is educational content, restrict modifications to admin users only
    - Keep public read access as it's educational content
    
  ## Notes
  - Foreign key indexes improve query performance when joining tables
  - RLS policies now properly restrict write access instead of allowing unrestricted access
  - The Auth DB connection strategy issue requires manual configuration in Supabase dashboard
    and cannot be fixed via SQL migration
*/

-- Add missing indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_syllabus_belt_id ON syllabus(belt_id);
CREATE INDEX IF NOT EXISTS idx_videos_belt_id ON videos(belt_id);

-- Drop existing overly permissive policies on glossary_terms
DROP POLICY IF EXISTS "Authenticated users can insert glossary terms" ON glossary_terms;
DROP POLICY IF EXISTS "Authenticated users can update glossary terms" ON glossary_terms;
DROP POLICY IF EXISTS "Authenticated users can delete glossary terms" ON glossary_terms;

-- Create restrictive policies that only allow modifications by admin users
-- Note: For now, we'll prevent all modifications since there's no admin role system
-- If admin functionality is needed later, you can add a role column or use auth.jwt() claims

-- Allow authenticated users to suggest terms (can be moderated later)
-- For now, we'll keep read-only for all users to prevent abuse
-- If you need to add/edit terms, use the Supabase dashboard or a secure admin interface

CREATE POLICY "Only service role can insert glossary terms"
  ON glossary_terms
  FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE POLICY "Only service role can update glossary terms"
  ON glossary_terms
  FOR UPDATE
  TO authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Only service role can delete glossary terms"
  ON glossary_terms
  FOR DELETE
  TO authenticated
  USING (false);
