-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  location TEXT,
  bio TEXT,
  phone TEXT,
  level TEXT DEFAULT 'Начинающий',
  favorite_shot TEXT,
  play_style TEXT,
  profile_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for profiles
CREATE POLICY "Users can view all profiles" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create player_stats table
CREATE TABLE IF NOT EXISTS player_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  matches_played INTEGER DEFAULT 0,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  ranking INTEGER DEFAULT 0,
  points INTEGER DEFAULT 1000,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on player_stats
ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for player_stats
CREATE POLICY "Users can view all player stats" ON player_stats
  FOR SELECT USING (true);

CREATE POLICY "Users can update own stats" ON player_stats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats" ON player_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location TEXT NOT NULL,
  registration_deadline DATE NOT NULL,
  status TEXT DEFAULT 'Открыт' CHECK (status IN ('Открыт', 'Скоро', 'Закрыт', 'Завершен')),
  format TEXT NOT NULL,
  entry_fee TEXT,
  prize_pool TEXT,
  skill_levels TEXT[] DEFAULT ARRAY['Все уровни'],
  max_participants INTEGER DEFAULT 32,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on tournaments
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;

-- Create policy for tournaments (public read)
CREATE POLICY "Anyone can view tournaments" ON tournaments
  FOR SELECT USING (true);

-- Create tournament_registrations table
CREATE TABLE IF NOT EXISTS tournament_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  registration_date TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'cancelled', 'confirmed')),
  UNIQUE(tournament_id, user_id)
);

-- Enable RLS on tournament_registrations
ALTER TABLE tournament_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for tournament_registrations
CREATE POLICY "Users can view all registrations" ON tournament_registrations
  FOR SELECT USING (true);

CREATE POLICY "Users can register themselves" ON tournament_registrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own registrations" ON tournament_registrations
  FOR UPDATE USING (auth.uid() = user_id);

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tournament_id UUID REFERENCES tournaments(id) ON DELETE SET NULL,
  player1_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  player2_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  winner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  score TEXT,
  match_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on matches
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Create policies for matches
CREATE POLICY "Users can view all matches" ON matches
  FOR SELECT USING (true);

CREATE POLICY "Players can update their matches" ON matches
  FOR UPDATE USING (auth.uid() = player1_id OR auth.uid() = player2_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_player_stats_user_id ON player_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_player_stats_ranking ON player_stats(ranking);
CREATE INDEX IF NOT EXISTS idx_tournament_registrations_tournament_id ON tournament_registrations(tournament_id);
CREATE INDEX IF NOT EXISTS idx_tournament_registrations_user_id ON tournament_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_matches_tournament_id ON matches(tournament_id);
CREATE INDEX IF NOT EXISTS idx_matches_player1_id ON matches(player1_id);
CREATE INDEX IF NOT EXISTS idx_matches_player2_id ON matches(player2_id);
CREATE INDEX IF NOT EXISTS idx_matches_date ON matches(match_date);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Новый пользователь'),
    NEW.email,
    NOW(),
    NOW()
  );
  
  INSERT INTO public.player_stats (user_id, created_at, updated_at)
  VALUES (NEW.id, NOW(), NOW());
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample tournaments
INSERT INTO tournaments (name, description, start_date, end_date, location, registration_deadline, status, format, entry_fee, prize_pool, skill_levels, max_participants, image_url) VALUES
('Летний теннисный турнир', 'Турнир выходного дня для игроков среднего и продвинутого уровня с призами для победителей в одиночном и парном разрядах.', '2025-07-15', '2025-07-17', 'Центральный теннисный клуб, Москва', '2025-07-10', 'Открыт', 'Одиночный и парный', '5000₽', '100 000₽', ARRAY['Средний', 'Продвинутый'], 32, 'https://images.pexels.com/photos/6956427/pexels-photo-6956427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
('Парный чемпионат', 'Наш ежегодный парный турнир с дивизионами для всех уровней игры. Найдите партнера и боритесь за чемпионский титул.', '2025-08-05', '2025-08-07', 'Теннисный центр "Запад", Санкт-Петербург', '2025-07-25', 'Открыт', 'Только парный', '6000₽ за пару', '150 000₽', ARRAY['Все уровни'], 24, 'https://images.pexels.com/photos/8224057/pexels-photo-8224057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
('Кубок ветеранов', 'Специальный турнир для игроков старше 50 лет с несколькими дивизионами по возрасту и уровню игры.', '2025-09-10', '2025-09-12', 'Теннисный клуб "Золотые годы", Сочи', '2025-08-30', 'Открыт', 'Одиночный и парный', '4000₽', '80 000₽', ARRAY['Все уровни'], 32, 'https://images.pexels.com/photos/8224035/pexels-photo-8224035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');