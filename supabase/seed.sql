-- ==============================================================================
-- EXP CRICKET INITIAL DATA SEED FILE
-- Seed file for teams, players, grounds, and matches
-- ==============================================================================

-- 1. TEAMS SEED
INSERT INTO public.teams (id, name, code, flag_url, primary_color, accent_color, captain, coach, rankings, head_to_head_records)
VALUES
('india', 'India', 'IND', 'https://flagcdn.com/w80/in.png', '#0055a5', '#ffcd00', 'Rohit Sharma', 'Gautam Gambhir', '{"test": 1, "odi": 1, "t20i": 1}', '[{"opponentCode": "AUS", "matchesPlayed": 107, "wins": 32, "losses": 45, "ties": 1, "noResults": 29}]'),
('australia', 'Australia', 'AUS', 'https://flagcdn.com/w80/au.png', '#ffcd00', '#0055a5', 'Pat Cummins', 'Andrew McDonald', '{"test": 2, "odi": 2, "t20i": 2}', '[{"opponentCode": "IND", "matchesPlayed": 107, "wins": 45, "losses": 32, "ties": 1, "noResults": 29}]')
ON CONFLICT (id) DO NOTHING;

-- 2. PLAYERS SEED
INSERT INTO public.players (id, name, full_name, country, country_code, role, batting_style, bowling_style, avatar_url, country_flag_url, primary_color, accent_color, icc_rankings, stats, phase_analysis, form_trend, radar_metrics)
VALUES
(
    'virat-kohli',
    'Virat Kohli',
    'Virat Kohli',
    'India',
    'IND',
    'BATTER',
    'Right-hand bat',
    'Right-arm medium',
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80',
    'https://flagcdn.com/w80/in.png',
    '#0055a5',
    '#ffcd00',
    '{"test": 6, "odi": 3, "t20i": 15}',
    '{"ODI": {"batting": {"matches": 295, "innings": 283, "runs": 13848, "highestScore": "183", "average": 58.18, "strikeRate": 93.58, "hundreds": 50, "fifties": 72, "fours": 1294, "sixes": 151, "boundaryPercentage": 61.2, "dotBallPercentage": 41.5}}, "ALL": {"batting": {"matches": 533, "innings": 591, "runs": 26942, "highestScore": "254*", "average": 53.35, "strikeRate": 79.5, "hundreds": 80, "fifties": 140, "fours": 2650, "sixes": 300, "boundaryPercentage": 58.0, "dotBallPercentage": 45.0}}}',
    '{"ODI": {"powerplay": {"runs": 1420, "strikeRate": 84.5, "dismissals": 18, "dotBallPct": 48.2}, "middleOvers": {"runs": 9850, "strikeRate": 91.2, "dismissals": 145, "dotBallPct": 38.5}, "deathOvers": {"runs": 2578, "strikeRate": 168.4, "dismissals": 48, "dotBallPct": 22.1}}}',
    '[{"match": "IND vs AUS 1st ODI", "runs": 85, "opponent": "AUS", "date": "2024-11-22"}, {"match": "IND vs SA 3rd T20I", "runs": 76, "opponent": "SA", "date": "2024-06-29"}]',
    '{"consistency": 98, "powerHitting": 84, "spinAdaptability": 94, "paceAdaptability": 96, "pressureHandling": 99, "clutchIndex": 99}'
),
(
    'travis-head',
    'Travis Head',
    'Travis Michael Head',
    'Australia',
    'AUS',
    'BATTER',
    'Left-hand bat',
    'Right-arm offbreak',
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=400&q=80',
    'https://flagcdn.com/w80/au.png',
    '#ffcd00',
    '#0055a5',
    '{"test": 10, "odi": 5, "t20i": 1}',
    '{"ODI": {"batting": {"matches": 65, "innings": 62, "runs": 2397, "highestScore": "152", "average": 42.8, "strikeRate": 104.6, "hundreds": 5, "fifties": 16, "fours": 280, "sixes": 62, "boundaryPercentage": 68.4, "dotBallPercentage": 46.2}}, "ALL": {"batting": {"matches": 130, "innings": 140, "runs": 5500, "highestScore": "175", "average": 40.5, "strikeRate": 98.2, "hundreds": 11, "fifties": 30, "fours": 650, "sixes": 140, "boundaryPercentage": 65.0, "dotBallPercentage": 48.0}}}',
    '{"ODI": {"powerplay": {"runs": 1100, "strikeRate": 115.2, "dismissals": 16, "dotBallPct": 42.0}, "middleOvers": {"runs": 950, "strikeRate": 94.8, "dismissals": 22, "dotBallPct": 45.0}, "deathOvers": {"runs": 347, "strikeRate": 152.0, "dismissals": 10, "dotBallPct": 30.0}}}',
    '[{"match": "AUS vs IND WTC Final", "runs": 163, "opponent": "IND", "date": "2023-06-07"}]',
    '{"consistency": 85, "powerHitting": 94, "spinAdaptability": 86, "paceAdaptability": 92, "pressureHandling": 95, "clutchIndex": 96}'
)
ON CONFLICT (id) DO NOTHING;

-- 3. GROUNDS SEED
INSERT INTO public.grounds (id, name, short_name, city, country, capacity, pitch_type, image_url, boundary_dimensions, stats, historical_records, weather_forecast)
VALUES
(
    'mcg',
    'Melbourne Cricket Ground',
    'MCG',
    'Melbourne',
    'Australia',
    100024,
    'Pace-Friendly',
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    '{"straight": 84, "squareLeg": 75, "cover": 78, "fineLeg": 72, "thirdMan": 70, "longOn": 85, "longOff": 85}',
    '{"T20I": {"totalMatches": 27, "avgFirstInningsScore": 161, "avgSecondInningsScore": 144, "highestTotal": "186/5 (IND vs ZIM)", "lowestTotal": "74/10 (IND vs AUS)", "battingFirstWinPct": 42, "chasingWinPct": 58, "paceWicketsPct": 74, "spinWicketsPct": 26, "dayWinPct": 45, "nightWinPct": 55}}',
    '{"highestIndividualScore": "180 (Jason Roy)", "bestBowlingFigures": "6/30 (Yuzvendra Chahal)", "highestSuccessfulChase": "186/5 (Australia)"}',
    '{"tempC": 19, "humidityPct": 62, "condition": "Partly Cloudy", "rainProbabilityPct": 15}'
)
ON CONFLICT (id) DO NOTHING;

-- 4. MATCHES SEED
INSERT INTO public.matches (id, title, series, format, status, venue, date, team_a, team_b, result_summary, player_of_the_match, win_probability_matrix, tactical_notes)
VALUES
(
    'ind-vs-aus-bgt-test1',
    '1st Test: Australia vs India',
    'Border-Gavaskar Trophy 2024-25',
    'TEST',
    'LIVE',
    'Optus Stadium, Perth',
    '2024-11-22',
    '{"name": "India", "code": "IND", "flagUrl": "https://flagcdn.com/w80/in.png", "scoreCard": [{"teamName": "India", "teamCode": "IND", "runs": 150, "wickets": 10, "overs": 49.4}, {"teamName": "India", "teamCode": "IND", "runs": 487, "wickets": 6, "overs": 134.3, "isDeclared": true}]}',
    '{"name": "Australia", "code": "AUS", "flagUrl": "https://flagcdn.com/w80/au.png", "scoreCard": [{"teamName": "Australia", "teamCode": "AUS", "runs": 104, "wickets": 10, "overs": 51.2}, {"teamName": "Australia", "teamCode": "AUS", "runs": 238, "wickets": 10, "overs": 58.4}]}',
    'India won by 295 runs',
    'Jasprit Bumrah (8/72 & Captain)',
    '[{"over": 10, "teamAProb": 45, "teamBProb": 55, "keyEvent": "Starc removes Rahul early"}, {"over": 50, "teamAProb": 88, "teamBProb": 12, "keyEvent": "Bumrah 5-wicket haul collapses Australia"}]',
    '["Perth pitch offer 2.4° lateral seam deviation in Session 1", "Jasprit Bumrah spell destabilized Australia top order"]'
)
ON CONFLICT (id) DO NOTHING;
