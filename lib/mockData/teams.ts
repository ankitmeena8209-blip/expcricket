import { Team } from "@/types/team";

export const MOCK_TEAMS: Team[] = [
  {
    id: "india",
    name: "India",
    code: "IND",
    flagUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=100&auto=format&fit=crop&q=80",
    primaryColor: "#0055a5",
    accentColor: "#ff9933",
    rankings: { test: 1, odi: 1, t20i: 1 },
    headToHeadRecords: [
      { opponentCode: "AUS", matchesPlayed: 107, wins: 32, losses: 45, ties: 1, noResults: 29 },
      { opponentCode: "ENG", matchesPlayed: 136, wins: 35, losses: 51, ties: 0, noResults: 50 },
    ],
    captain: "Rohit Sharma",
    coach: "Gautam Gambhir",
  },
  {
    id: "australia",
    name: "Australia",
    code: "AUS",
    flagUrl: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=100&auto=format&fit=crop&q=80",
    primaryColor: "#ffcd00",
    accentColor: "#00843d",
    rankings: { test: 2, odi: 2, t20i: 2 },
    headToHeadRecords: [
      { opponentCode: "IND", matchesPlayed: 107, wins: 45, losses: 32, ties: 1, noResults: 29 },
      { opponentCode: "ENG", matchesPlayed: 356, wins: 152, losses: 111, ties: 0, noResults: 93 },
    ],
    captain: "Pat Cummins",
    coach: "Andrew McDonald",
  },
];
