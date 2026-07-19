export type MatchStatus = "LIVE" | "UPCOMING" | "COMPLETED";

export interface InningsScorecard {
  teamName: string;
  teamCode: string;
  runs: number;
  wickets: number;
  overs: number;
  isDeclared?: boolean;
}

export interface WinProbabilityPoint {
  over: number;
  teamAProb: number;
  teamBProb: number;
  keyEvent?: string;
}

export interface Match {
  id: string;
  title: string;
  series: string;
  format: "TEST" | "ODI" | "T20I";
  status: MatchStatus;
  venue: string;
  date: string;
  teamA: {
    name: string;
    code: string;
    flagUrl: string;
    scoreCard?: InningsScorecard[];
  };
  teamB: {
    name: string;
    code: string;
    flagUrl: string;
    scoreCard?: InningsScorecard[];
  };
  resultSummary?: string;
  playerOfTheMatch?: string;
  winProbabilityMatrix?: WinProbabilityPoint[];
  tacticalNotes?: string[];
}
