/*
  # Update Belt Requirements with Complete Syllabus Data

  1. Changes
    - Add missing belt levels (Purple 4th Kyu, Brown 2nd Kyu, Brown 1st Kyu)
    - Update all belts with correct YouTube URLs
    - Update all syllabus requirements with proper kata, combinations, and kicks
    - Reorganize belt order to match proper progression

  2. Belt Structure
    - White (9th Kyu)
    - Yellow (8th Kyu)
    - Orange (7th Kyu)
    - Green (6th Kyu)
    - Blue (5th Kyu)
    - Purple (4th Kyu)
    - Brown 3rd Kyu
    - Brown 2nd Kyu
    - Brown 1st Kyu
    - Black Belt (1st Dan+)
*/

-- First, let's add the missing belt levels if they don't exist
DO $$
DECLARE
  purple_belt_id uuid;
  brown_2nd_belt_id uuid;
  brown_1st_belt_id uuid;
BEGIN
  -- Insert Purple Belt (4th Kyu)
  INSERT INTO belts (name, color_hex, "order", youtube_url)
  VALUES ('4th Kyu - Purple Belt', '#9333EA', 6, 'https://www.youtube.com/watch?v=SCdzlt4oGzw')
  RETURNING id INTO purple_belt_id;
  
  -- Insert Brown Belt 2nd Kyu
  INSERT INTO belts (name, color_hex, "order", youtube_url)
  VALUES ('2nd Kyu - Brown Belt', '#92400E', 8, 'https://www.youtube.com/watch?v=1806Qfpx0Rk')
  RETURNING id INTO brown_2nd_belt_id;
  
  -- Insert Brown Belt 1st Kyu
  INSERT INTO belts (name, color_hex, "order", youtube_url)
  VALUES ('1st Kyu - Brown Belt', '#78350F', 9, NULL)
  RETURNING id INTO brown_1st_belt_id;

  -- Create syllabus entries for new belts
  INSERT INTO syllabus (belt_id, kata, combination, kick, notes)
  VALUES 
    (purple_belt_id, 'ANANANKU, MATSUKAZI', '1 - 9', 'USHIRO MAWASHI GERI, Kicking Combinations', 'Introduction to advanced kata and kicking combinations'),
    (brown_2nd_belt_id, 'BASSAI DAI, NISEISHI', '1 - 9', 'USHIRO MAWASHI GERI, TOBI GERI (Jumping Kick), Kicking Combinations', 'Master level kata demonstrating strength and power'),
    (brown_1st_belt_id, 'Chinto, Kururunfa', '1 - 9', 'USHIRO MAWASHI GERI, TOBI GERI (Jumping Kick), Axe kick (Kakato geri), Kicking Combinations', 'Final requirements before black belt. Includes Bunkai (application) and Hokei Kumite (pre-arranged sparring)');

EXCEPTION WHEN unique_violation THEN
  -- Belts already exist, just continue
  NULL;
END $$;

-- Update existing belts with YouTube URLs
UPDATE belts 
SET youtube_url = 'https://www.youtube.com/watch?v=VB-GXt0pQSA'
WHERE name = '9th Kyu - White Belt';

UPDATE belts 
SET youtube_url = 'https://www.youtube.com/watch?v=-3hwVkBeNrE'
WHERE name = '8th Kyu - Yellow Belt';

UPDATE belts 
SET youtube_url = 'https://www.youtube.com/watch?v=xnDbSXLn_p0'
WHERE name = '7th Kyu - Orange Belt';

UPDATE belts 
SET youtube_url = 'https://www.youtube.com/watch?v=keCNTbGTON4'
WHERE name = '6th Kyu - Green Belt';

UPDATE belts 
SET youtube_url = 'https://www.youtube.com/watch?v=_8TV9YM_rYU'
WHERE name = '5th Kyu - Blue Belt';

UPDATE belts 
SET youtube_url = 'https://www.youtube.com/watch?v=6znHzBBeUhs',
    name = '3rd Kyu - Brown Belt',
    "order" = 7
WHERE name = 'Brown Belt (3rd-1st Kyu)';

-- Now update all syllabus requirements
-- White Belt (9th Kyu)
UPDATE syllabus 
SET kata = 'SHI-ZUKI 1',
    combination = '1 & 2',
    kick = 'Front Kick (MAE GERI)',
    notes = 'Foundation level - Focus on basic stances and techniques'
WHERE belt_id = (SELECT id FROM belts WHERE name = '9th Kyu - White Belt');

-- Yellow Belt (8th Kyu)
UPDATE syllabus 
SET kata = 'Pinan Shodan',
    combination = '1, 2, 3a',
    kick = 'Roundhouse (MAWASHI GERI)',
    notes = 'Introduction to first formal kata'
WHERE belt_id = (SELECT id FROM belts WHERE name = '8th Kyu - Yellow Belt');

-- Orange Belt (7th Kyu)
UPDATE syllabus 
SET kata = 'Pinan Nidan',
    combination = '1, 2, 3a, 3b, 4a',
    kick = 'YOKO GERI (Side Kick)',
    notes = 'Second Pinan kata with more complex movements'
WHERE belt_id = (SELECT id FROM belts WHERE name = '7th Kyu - Orange Belt');

-- Green Belt (6th Kyu)
UPDATE syllabus 
SET kata = 'Pinan Sandan',
    combination = '1 - 6',
    kick = 'USHIRO GERI (Back Kick)',
    notes = 'Third Pinan kata with increased difficulty'
WHERE belt_id = (SELECT id FROM belts WHERE name = '6th Kyu - Green Belt');

-- Blue Belt (5th Kyu)
UPDATE syllabus 
SET kata = 'Pinan Yondan, Pinan Godan',
    combination = '1 - 7',
    kick = 'URA MAWASHI GERI (Reverse Roundhouse)',
    notes = 'Completion of all five Pinan katas'
WHERE belt_id = (SELECT id FROM belts WHERE name = '5th Kyu - Blue Belt');

-- Purple Belt (4th Kyu)
UPDATE syllabus 
SET kata = 'ANANANKU, MATSUKAZI',
    combination = '1 - 9',
    kick = 'USHIRO MAWASHI GERI, Kicking Combinations',
    notes = 'Introduction to advanced kata and kicking combinations'
WHERE belt_id = (SELECT id FROM belts WHERE name = '4th Kyu - Purple Belt');

-- Brown Belt 3rd Kyu
UPDATE syllabus 
SET kata = 'JI-IN, ROHI',
    combination = '1 - 9',
    kick = 'USHIRO MAWASHI GERI, TOBI GERI (Jumping Kick), Kicking Combinations',
    notes = 'Advanced kata with jumping techniques'
WHERE belt_id = (SELECT id FROM belts WHERE name = '3rd Kyu - Brown Belt');

-- Brown Belt 2nd Kyu
UPDATE syllabus 
SET kata = 'BASSAI DAI, NISEISHI',
    combination = '1 - 9',
    kick = 'USHIRO MAWASHI GERI, TOBI GERI (Jumping Kick), Kicking Combinations',
    notes = 'Master level kata demonstrating strength and power'
WHERE belt_id = (SELECT id FROM belts WHERE name = '2nd Kyu - Brown Belt');

-- Brown Belt 1st Kyu
UPDATE syllabus 
SET kata = 'Chinto, Kururunfa',
    combination = '1 - 9',
    kick = 'USHIRO MAWASHI GERI, TOBI GERI (Jumping Kick), Axe kick (Kakato geri), Kicking Combinations',
    notes = 'Final requirements before black belt. Includes Bunkai (application) and Hokei Kumite (pre-arranged sparring)'
WHERE belt_id = (SELECT id FROM belts WHERE name = '1st Kyu - Brown Belt');
