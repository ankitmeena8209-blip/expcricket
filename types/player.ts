export type FormatType = "TEST" | "ODI" | "T20I" | "ALL";
export type PlayerRole = "BATTER" | "BOWLER" | "ALL_ROUNDER" | "WICKETKEEPER";
export type BattingStyle = "Right-hand bat" | "Left-hand bat";
export type BowlingStyle = 
  | "Right-arm fast" 
  | "Right-arm medium" 
  | "Right-arm offbreak" 
  | "Right-arm legbreak"
  | "Left-arm fast" 
  | "Left-arm orthodox" 
  | "Left-arm chinaman";

export interface BattingStats {
  matches: number;
  innings: number;
  runs: number;
  highestScore: string;
  average: number;
  strikeRate: number;
  hundreds: number;
  fifties: number;
  fours: number;
  sixes: number;
  boundaryPercentage: number;
  dotBallPercentage: number;
}

export interface BowlingStats {
  matches: number;
  overs: number;
  wickets: number;
  bestBowling: string;
  average: number;
  economy: number;
  strikeRate: number;
  fiveWickets: number;
  dotBallPercentage: number;
}

export interface PhasePerformance {
  powerplay: { runs: number; strikeRate: number; dismissals: number; dotBallPct: number };
  middleOvers: { runs: number; strikeRate: number; dismissals: number; dotBallPct: number };
  deathOvers: { runs: number; strikeRate: number; dismissals: number; dotBallPct: number };
}

export interface BowlerMatchup {
  bowlerName: string;
  bowlerType: string;
  runsScored: number;
  ballsFaced: number;
  dismissals: number;
  strikeRate: number;
  dotBallPercentage: number;
}

export interface Player {
  id: string;
  name: string;
  fullName: string;
  country: string;
  countryCode: string;
  role: PlayerRole;
  battingStyle: BattingStyle;
  bowlingStyle: BowlingStyle;
  iccRankings: {
    test?: number;
    odi?: number;
    t20i?: number;
  };
  avatarUrl: string;
  countryFlagUrl: string;
  primaryColor: string; // Dynamic theme accent color (e.g. #0055a5 for India)
  accentColor: string;
  stats: Record<FormatType, { batting: BattingStats; bowling?: BowlingStats }>;
  phaseAnalysis?: Record<FormatType, PhasePerformance>;
  matchups?: BowlerMatchup[];
  formTrend: { match: string; runs: number; opponent: string; date: string }[];
  radarMetrics: {
    consistency: number;
    powerHitting: number;
    spinAdaptability: number;
    paceAdaptability: number;
    pressureHandling: number;
    clutchIndex: number;
  };
}
