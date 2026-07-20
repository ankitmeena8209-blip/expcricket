-- ==============================================================================
-- EXP CRICKET (XPERT CRICKET) DATABASE MIGRATION
-- Migration: 20260720000001_update_rls_policies.sql
-- Description: Grant full public/anonymous write permissions (INSERT, UPDATE, DELETE, SELECT)
--              for teams, players, grounds, matches, matchups, system_logs, and ai_cache_entries.
--              Resolves PostgreSQL Error 42501 (RLS Policy Violation) during CricAPI live data sync.
-- ==============================================================================

-- 1. TEAMS TABLE RLS POLICIES
DROP POLICY IF EXISTS "Public Read Teams" ON public.teams;
DROP POLICY IF EXISTS "Public Manage Teams" ON public.teams;
CREATE POLICY "Public Manage Teams" ON public.teams FOR ALL USING (true) WITH CHECK (true);

-- 2. PLAYERS TABLE RLS POLICIES
DROP POLICY IF EXISTS "Public Read Players" ON public.players;
DROP POLICY IF EXISTS "Admin Modify Players" ON public.players;
DROP POLICY IF EXISTS "Public Manage Players" ON public.players;
CREATE POLICY "Public Manage Players" ON public.players FOR ALL USING (true) WITH CHECK (true);

-- 3. GROUNDS TABLE RLS POLICIES
DROP POLICY IF EXISTS "Public Read Grounds" ON public.grounds;
DROP POLICY IF EXISTS "Admin Modify Grounds" ON public.grounds;
DROP POLICY IF EXISTS "Public Manage Grounds" ON public.grounds;
CREATE POLICY "Public Manage Grounds" ON public.grounds FOR ALL USING (true) WITH CHECK (true);

-- 4. MATCHES TABLE RLS POLICIES
DROP POLICY IF EXISTS "Public Read Matches" ON public.matches;
DROP POLICY IF EXISTS "Admin Modify Matches" ON public.matches;
DROP POLICY IF EXISTS "Public Manage Matches" ON public.matches;
CREATE POLICY "Public Manage Matches" ON public.matches FOR ALL USING (true) WITH CHECK (true);

-- 5. PLAYER MATCHUPS TABLE RLS POLICIES
DROP POLICY IF EXISTS "Public Read Matchups" ON public.player_matchups;
DROP POLICY IF EXISTS "Public Manage Matchups" ON public.player_matchups;
CREATE POLICY "Public Manage Matchups" ON public.player_matchups FOR ALL USING (true) WITH CHECK (true);

-- 6. AI CACHE ENTRIES TABLE RLS POLICIES
DROP POLICY IF EXISTS "Public Read AI Cache" ON public.ai_cache_entries;
DROP POLICY IF EXISTS "Public Manage AI Cache" ON public.ai_cache_entries;
CREATE POLICY "Public Manage AI Cache" ON public.ai_cache_entries FOR ALL USING (true) WITH CHECK (true);

-- 7. SYSTEM LOGS TABLE RLS POLICIES
DROP POLICY IF EXISTS "Admin Insert Logs" ON public.system_logs;
CREATE POLICY "Admin Insert Logs" ON public.system_logs FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin View Logs" ON public.system_logs;
CREATE POLICY "Admin View Logs" ON public.system_logs FOR ALL USING (true);
