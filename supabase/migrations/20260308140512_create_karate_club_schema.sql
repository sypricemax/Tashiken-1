/*
  # Karate Club App Database Schema

  1. New Tables
    - `belts`
      - `id` (uuid, primary key)
      - `name` (text) - Belt name (e.g., "White", "Yellow")
      - `order` (int) - Display order
      - `color_hex` (text) - Color code for visual display
      - `created_at` (timestamptz)
    
    - `syllabus`
      - `id` (uuid, primary key)
      - `belt_id` (uuid, foreign key to belts)
      - `kata` (text) - Kata requirement
      - `combination` (text) - Combination requirement
      - `kick` (text) - Kick requirement
      - `stance` (text) - Stance requirement
      - `punch` (text) - Punch requirement
      - `blocking` (text) - Blocking requirement
      - `notes` (text) - Additional notes
      - `created_at` (timestamptz)
    
    - `videos`
      - `id` (uuid, primary key)
      - `belt_id` (uuid, foreign key to belts, nullable)
      - `title` (text) - Video title
      - `youtube_url` (text) - YouTube video URL
      - `description` (text) - Video description
      - `order` (int) - Display order within belt
      - `created_at` (timestamptz)
    
    - `club_info`
      - `id` (uuid, primary key)
      - `training_times` (text) - Training schedule
      - `venue` (text) - Venue details
      - `instructor_details` (text) - Instructor information
      - `contact_info` (text) - Contact information
      - `general_guidance` (text) - General club guidance
      - `club_name` (text) - Club name
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (suitable for a club app)
*/

-- Create belts table
CREATE TABLE IF NOT EXISTS belts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  "order" int NOT NULL,
  color_hex text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE belts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read belts"
  ON belts
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create syllabus table
CREATE TABLE IF NOT EXISTS syllabus (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  belt_id uuid NOT NULL REFERENCES belts(id) ON DELETE CASCADE,
  kata text DEFAULT '',
  combination text DEFAULT '',
  kick text DEFAULT '',
  stance text DEFAULT '',
  punch text DEFAULT '',
  blocking text DEFAULT '',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE syllabus ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read syllabus"
  ON syllabus
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  belt_id uuid REFERENCES belts(id) ON DELETE SET NULL,
  title text NOT NULL,
  youtube_url text NOT NULL,
  description text DEFAULT '',
  "order" int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read videos"
  ON videos
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create club_info table
CREATE TABLE IF NOT EXISTS club_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  training_times text DEFAULT '',
  venue text DEFAULT '',
  instructor_details text DEFAULT '',
  contact_info text DEFAULT '',
  general_guidance text DEFAULT '',
  club_name text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE club_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read club info"
  ON club_info
  FOR SELECT
  TO anon, authenticated
  USING (true);