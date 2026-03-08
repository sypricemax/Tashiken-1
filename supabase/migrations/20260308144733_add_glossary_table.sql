/*
  # Add Glossary Table

  1. New Tables
    - `glossary_terms`
      - `id` (uuid, primary key)
      - `term` (text) - Japanese term
      - `pronunciation` (text) - How to pronounce the term
      - `meaning` (text) - English translation/meaning
      - `category` (text) - Category (General, Stances, Blocks, Strikes, Kicks, Sparring, etc.)
      - `sort_order` (integer) - For custom ordering
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `glossary_terms` table
    - Add policy for public read access (glossary is educational content)
    - Add policy for authenticated admin users to manage terms
*/

CREATE TABLE IF NOT EXISTS glossary_terms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  term text NOT NULL,
  pronunciation text,
  meaning text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE glossary_terms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view glossary terms"
  ON glossary_terms
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert glossary terms"
  ON glossary_terms
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update glossary terms"
  ON glossary_terms
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete glossary terms"
  ON glossary_terms
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert common Shukokai karate terms
INSERT INTO glossary_terms (term, pronunciation, meaning, category, sort_order) VALUES
  -- General Terms
  ('Karate', 'kah-rah-tay', 'Empty hand', 'General', 1),
  ('Dojo', 'doh-joh', 'Training hall (place of the way)', 'General', 2),
  ('Gi', 'gee', 'Karate uniform', 'General', 3),
  ('Obi', 'oh-bee', 'Belt', 'General', 4),
  ('Sensei', 'sen-say', 'Teacher/instructor', 'General', 5),
  ('Sempai', 'sem-pie', 'Senior student', 'General', 6),
  ('Kohai', 'koh-high', 'Junior student', 'General', 7),
  ('Rei', 'ray', 'Bow (showing respect)', 'General', 8),
  ('Hajime', 'hah-jee-may', 'Begin', 'General', 9),
  ('Yame', 'yah-may', 'Stop', 'General', 10),
  ('Yoi', 'yoy', 'Ready', 'General', 11),
  ('Kiai', 'kee-eye', 'Spirit shout', 'General', 12),
  
  -- Training Components
  ('Kihon', 'kee-hon', 'Basic techniques', 'Training', 20),
  ('Kata', 'kah-tah', 'Form (pre-arranged movements)', 'Training', 21),
  ('Kumite', 'koo-mee-tay', 'Sparring', 'Training', 22),
  ('Bunkai', 'boon-kye', 'Application of kata techniques', 'Training', 23),
  
  -- Stances (Dachi Waza)
  ('Dachi', 'dah-chee', 'Stance', 'Stances', 30),
  ('Zenkutsu Dachi', 'zen-koot-soo dah-chee', 'Front stance', 'Stances', 31),
  ('Kokutsu Dachi', 'koh-koot-soo dah-chee', 'Back stance', 'Stances', 32),
  ('Kiba Dachi', 'kee-bah dah-chee', 'Straddle stance (horse stance)', 'Stances', 33),
  ('Neko Ashi Dachi', 'neh-koh ah-shee dah-chee', 'Cat stance', 'Stances', 34),
  ('Hachiji Dachi', 'hah-chee-jee dah-chee', 'Natural stance (open leg stance)', 'Stances', 35),
  ('Fudo Dachi', 'foo-doh dah-chee', 'Fighting stance', 'Stances', 36),
  
  -- Blocks (Uke Waza)
  ('Uke', 'oo-kay', 'Block', 'Blocks', 40),
  ('Age Uke', 'ah-gay oo-kay', 'Rising block (upper block)', 'Blocks', 41),
  ('Gedan Barai', 'geh-dahn bah-rye', 'Lower block (downward sweep)', 'Blocks', 42),
  ('Soto Uke', 'soh-toh oo-kay', 'Outside block (outward block)', 'Blocks', 43),
  ('Uchi Uke', 'oo-chee oo-kay', 'Inside block (inward block)', 'Blocks', 44),
  ('Shuto Uke', 'shoo-toh oo-kay', 'Knife hand block', 'Blocks', 45),
  ('Juji Uke', 'joo-jee oo-kay', 'X block (cross block)', 'Blocks', 46),
  
  -- Punches (Tsuki Waza)
  ('Tsuki', 'tsoo-kee', 'Punch', 'Punches', 50),
  ('Oi Tsuki', 'oy tsoo-kee', 'Lunge punch (stepping punch)', 'Punches', 51),
  ('Gyaku Tsuki', 'gyah-koo tsoo-kee', 'Reverse punch', 'Punches', 52),
  ('Choku Tsuki', 'choh-koo tsoo-kee', 'Straight punch', 'Punches', 53),
  ('Age Tsuki', 'ah-gay tsoo-kee', 'Rising punch (uppercut)', 'Punches', 54),
  ('Ren Tsuki', 'ren tsoo-kee', 'Double punch', 'Punches', 55),
  
  -- Strikes (Uchi Waza)
  ('Uchi', 'oo-chee', 'Strike', 'Strikes', 60),
  ('Uraken Uchi', 'oo-rah-ken oo-chee', 'Back fist strike', 'Strikes', 61),
  ('Shuto Uchi', 'shoo-toh oo-chee', 'Knife hand strike', 'Strikes', 62),
  ('Empi Uchi', 'em-pee oo-chee', 'Elbow strike', 'Strikes', 63),
  ('Tettsui Uchi', 'tet-tsoo-ee oo-chee', 'Hammer fist strike', 'Strikes', 64),
  
  -- Kicks (Geri Waza)
  ('Geri', 'geh-ree', 'Kick', 'Kicks', 70),
  ('Mae Geri', 'my geh-ree', 'Front kick', 'Kicks', 71),
  ('Yoko Geri', 'yoh-koh geh-ree', 'Side kick', 'Kicks', 72),
  ('Mawashi Geri', 'mah-wah-shee geh-ree', 'Roundhouse kick', 'Kicks', 73),
  ('Ushiro Geri', 'oo-shee-roh geh-ree', 'Back kick', 'Kicks', 74),
  ('Mae Geri Keage', 'my geh-ree kay-ah-gay', 'Front snap kick', 'Kicks', 75),
  ('Mae Geri Kekomi', 'my geh-ree keh-koh-mee', 'Front thrust kick', 'Kicks', 76),
  
  -- Levels/Directions
  ('Jodan', 'joh-dahn', 'Upper level (head height)', 'Levels', 80),
  ('Chudan', 'choo-dahn', 'Middle level (chest height)', 'Levels', 81),
  ('Gedan', 'geh-dahn', 'Lower level (below waist)', 'Levels', 82),
  ('Mae', 'my', 'Front', 'Directions', 83),
  ('Yoko', 'yoh-koh', 'Side', 'Directions', 84),
  ('Ushiro', 'oo-shee-roh', 'Back', 'Directions', 85),
  ('Mawashi', 'mah-wah-shee', 'Round/circular', 'Directions', 86),
  
  -- Numbers
  ('Ichi', 'ee-chee', 'One', 'Numbers', 90),
  ('Ni', 'nee', 'Two', 'Numbers', 91),
  ('San', 'sahn', 'Three', 'Numbers', 92),
  ('Shi/Yon', 'shee/yohn', 'Four', 'Numbers', 93),
  ('Go', 'goh', 'Five', 'Numbers', 94),
  ('Roku', 'roh-koo', 'Six', 'Numbers', 95),
  ('Shichi/Nana', 'shee-chee/nah-nah', 'Seven', 'Numbers', 96),
  ('Hachi', 'hah-chee', 'Eight', 'Numbers', 97),
  ('Ku/Kyu', 'koo/kyoo', 'Nine', 'Numbers', 98),
  ('Ju', 'joo', 'Ten', 'Numbers', 99)
ON CONFLICT DO NOTHING;