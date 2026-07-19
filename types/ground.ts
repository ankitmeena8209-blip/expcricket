export interface BoundaryDimensions {
  straight: number; // meters
  squareLeg: number;
  cover: number;
  fineLeg: number;
  thirdMan: number;
  longOn: number;
  longOff: number;
}

export interface VenueStats {
  totalMatches: number;
  avgFirstInningsScore: number;
  avgSecondInningsScore: number;
  highestTotal: string;
  lowestTotal: string;
  battingFirstWinPct: number;
  chasingWinPct: number;
  paceWicketsPct: number;
  spinWicketsPct: number;
  dayWinPct: number;
  nightWinPct: number;
}

export interface Ground {
  id: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  capacity: number;
  pitchType: "Pace-Friendly" | "Spin-Friendly" | "Batting Paradise" | "Balanced / Sporting";
  imageUrl: string;
  stats: Record<string, VenueStats>; // Keyed by format (TEST, ODI, T20I)
  boundaryDimensions: BoundaryDimensions;
  historicalRecords: {
    highestIndividualScore: string;
    bestBowlingFigures: string;
    highestSuccessfulChase: string;
  };
  weatherForecastPlaceholder: {
    tempC: number;
    humidityPct: number;
    condition: string;
    rainProbabilityPct: number;
  };
}
