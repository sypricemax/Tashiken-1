/*
  # Add YouTube URL to Belts Table

  1. Changes
    - Add `youtube_url` column to `belts` table
      - Type: text
      - Nullable: true
      - Stores the YouTube video link for belt requirements

  2. Notes
    - This column will store YouTube links to Sensei's video demonstrations for each belt level
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'belts' AND column_name = 'youtube_url'
  ) THEN
    ALTER TABLE belts ADD COLUMN youtube_url text;
  END IF;
END $$;