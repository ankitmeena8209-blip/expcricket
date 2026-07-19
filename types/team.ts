export interface Team {
  id: string;
  name: string;
  code: string;
  flagUrl: string;
  primaryColor: string;
  accentColor: string;
  rankings: {
    test: number;
    odi: number;
    t20i: number;
  };
  headToHeadRecords: {
    opponentCode: string;
    matchesPlayed: number;
    wins: number;
    losses: number;
    ties: number;
    noResults: number;
  }[];
  captain: string;
  coach: string;
}
