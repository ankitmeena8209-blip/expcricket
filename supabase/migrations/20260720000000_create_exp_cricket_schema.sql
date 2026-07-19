-- ==============================================================================
-- EXP CRICKET (XPERT CRICKET) INSTITUTIONAL-GRADE DATABASE SCHEMA
-- Migration: 20260720000000_create_exp_cricket_schema.sql
-- Compatible with Supabase PostgreSQL, RLS, Storage Buckets, and Auth Triggers
-- ==============================================================================

-- Enable required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES TABLE (Supabase Auth Integration)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'USER' CHECK (role IN ('SUPER_ADMIN', 'ANALYST', 'MODERATOR', 'USER')),
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Automate user profile creation on auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'USER')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 2. TEAMS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.teams (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    flag_url TEXT,
    primary_color TEXT NOT NULL DEFAULT '#0055a5',
    accent_color TEXT NOT NULL DEFAULT '#ffcd00',
    captain TEXT,
    coach TEXT,
    rankings JSONB NOT NULL DEFAULT '{"test": 1, "odi": 1, "t20i": 1}'::jsonb,
    head_to_head_records JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. PLAYERS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.players (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    full_name TEXT NOT NULL,
    country TEXT NOT NULL,
    country_code TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('BATTER', 'BOWLER', 'ALL_ROUNDER', 'WICKETKEEPER')),
    batting_style TEXT NOT NULL,
    bowling_style TEXT NOT NULL,
    avatar_url TEXT,
    country_flag_url TEXT,
    primary_color TEXT NOT NULL DEFAULT '#0055a5',
    accent_color TEXT NOT NULL DEFAULT '#ffcd00',
    icc_rankings JSONB NOT NULL DEFAULT '{"test": 1, "odi": 1, "t20i": 1}'::jsonb,
    stats JSONB NOT NULL DEFAULT '{}'::jsonb,
    phase_analysis JSONB DEFAULT '{}'::jsonb,
    form_trend JSONB DEFAULT '[]'::jsonb,
    radar_metrics JSONB NOT NULL DEFAULT '{"consistency": 90, "powerHitting": 85, "spinAdaptability": 90, "paceAdaptability": 90, "pressureHandling": 95, "clutchIndex": 95}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. GROUNDS TABLE (Venue Intelligence)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.grounds (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    capacity INT NOT NULL DEFAULT 50000,
    pitch_type TEXT NOT NULL CHECK (pitch_type IN ('Pace-Friendly', 'Spin-Friendly', 'Batting Paradise', 'Balanced / Sporting')),
    image_url TEXT,
    boundary_dimensions JSONB NOT NULL DEFAULT '{"straight": 75, "squareLeg": 70, "cover": 72, "fineLeg": 68, "thirdMan": 65, "longOn": 78, "longOff": 78}'::jsonb,
    stats JSONB NOT NULL DEFAULT '{}'::jsonb,
    historical_records JSONB NOT NULL DEFAULT '{}'::jsonb,
    weather_forecast JSONB DEFAULT '{"tempC": 22, "humidityPct": 55, "condition": "Clear", "rainProbabilityPct": 10}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. MATCHES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.matches (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    series TEXT NOT NULL,
    format TEXT NOT NULL CHECK (format IN ('TEST', 'ODI', 'T20I')),
    status TEXT NOT NULL CHECK (status IN ('LIVE', 'UPCOMING', 'COMPLETED')),
    venue TEXT NOT NULL,
    date DATE NOT NULL,
    team_a JSONB NOT NULL,
    team_b JSONB NOT NULL,
    result_summary TEXT,
    player_of_the_match TEXT,
    win_probability_matrix JSONB DEFAULT '[]'::jsonb,
    tactical_notes JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. PLAYER MATCHUPS TABLE (Relational Head-to-Head Telemetry)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.player_matchups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batter_id TEXT NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    bowler_name TEXT NOT NULL,
    bowler_type TEXT NOT NULL,
    runs_scored INT NOT NULL DEFAULT 0,
    balls_faced INT NOT NULL DEFAULT 0,
    dismissals INT NOT NULL DEFAULT 0,
    strike_rate NUMERIC(6, 2) NOT NULL DEFAULT 0.00,
    dot_ball_percentage NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. USER FAVORITES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    entity_id TEXT NOT NULL,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('PLAYER', 'GROUND', 'MATCH')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, entity_id, entity_type)
);

-- ------------------------------------------------------------------------------
-- 8. AI CACHE ENTRIES TABLE (Groq Llama 3.3 Engine Cache)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ai_cache_entries (
    cache_key TEXT PRIMARY KEY,
    provider TEXT NOT NULL DEFAULT 'groq',
    prompt TEXT NOT NULL,
    response JSONB NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. SYSTEM LOGS TABLE (Admin Audit Logging)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.system_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    level TEXT NOT NULL CHECK (level IN ('INFO', 'WARN', 'ERROR', 'SECURITY')),
    module TEXT NOT NULL,
    message TEXT NOT NULL,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM PERFORMANCE & SCALABILITY
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_players_country ON public.players(country_code);
CREATE INDEX IF NOT EXISTS idx_players_role ON public.players(role);
CREATE INDEX IF NOT EXISTS idx_grounds_pitch ON public.grounds(pitch_type);
CREATE INDEX IF NOT EXISTS idx_matches_status ON public.matches(status);
CREATE INDEX IF NOT EXISTS idx_matches_format ON public.matches(format);
CREATE INDEX IF NOT EXISTS idx_matchups_batter ON public.player_matchups(batter_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_cache_expires ON public.ai_cache_entries(expires_at);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) & POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_matchups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_cache_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;

-- Public Read Policies (Allow everyone to view telemetry)
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Teams" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Public Read Players" ON public.players FOR SELECT USING (true);
CREATE POLICY "Public Read Grounds" ON public.grounds FOR SELECT USING (true);
CREATE POLICY "Public Read Matches" ON public.matches FOR SELECT USING (true);
CREATE POLICY "Public Read Matchups" ON public.player_matchups FOR SELECT USING (true);
CREATE POLICY "Public Read AI Cache" ON public.ai_cache_entries FOR SELECT USING (true);

-- User Specific Policies (Bookmarks & Personal Profile)
CREATE POLICY "Users Manage Own Profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users Manage Own Favorites" ON public.user_favorites
    FOR ALL USING (auth.uid() = user_id);

-- Admin / Analyst Full Access Policies
CREATE POLICY "Admin Modify Players" ON public.players
    FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'ANALYST')));

CREATE POLICY "Admin Modify Grounds" ON public.grounds
    FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'ANALYST')));

CREATE POLICY "Admin Modify Matches" ON public.matches
    FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'ANALYST')));

CREATE POLICY "Admin Insert Logs" ON public.system_logs
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin View Logs" ON public.system_logs
    FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'ANALYST')));

-- ==============================================================================
-- STORAGE BUCKETS (Player Avatars, Flags, Stadium Photos)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('player-avatars', 'player-avatars', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('country-flags', 'country-flags', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('ground-images', 'ground-images', true) ON CONFLICT (id) DO NOTHING;

-- Public Read Access for Storage Buckets
CREATE POLICY "Public Storage Read Avatars" ON storage.objects FOR SELECT USING (bucket_id = 'player-avatars');
CREATE POLICY "Public Storage Read Flags" ON storage.objects FOR SELECT USING (bucket_id = 'country-flags');
CREATE POLICY "Public Storage Read Grounds" ON storage.objects FOR SELECT USING (bucket_id = 'ground-images');
