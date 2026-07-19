import { Match } from "@/types/match";

export const MOCK_MATCHES: Match[] = [
  {
    id: "ind-vs-aus-bgt-test1",
    title: "1st Test - Border-Gavaskar Trophy",
    series: "India tour of Australia 2024-25",
    format: "TEST",
    status: "LIVE",
    venue: "Melbourne Cricket Ground (MCG)",
    date: "2024-12-26",
    teamA: {
      name: "India",
      code: "IND",
      flagUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=100&auto=format&fit=crop&q=80",
      scoreCard: [
        { teamName: "India", teamCode: "IND", runs: 282, wickets: 10, overs: 84.2 },
        { teamName: "India", teamCode: "IND", runs: 185, wickets: 4, overs: 56.0 },
      ],
    },
    teamB: {
      name: "Australia",
      code: "AUS",
      flagUrl: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=100&auto=format&fit=crop&q=80",
      scoreCard: [
        { teamName: "Australia", teamCode: "AUS", runs: 245, wickets: 10, overs: 78.4 },
      ],
    },
    resultSummary: "India lead by 222 runs in 2nd Innings (Day 3, Session 2)",
    playerOfTheMatch: "Virat Kohli (85* & 54)",
    winProbabilityMatrix: [
      { over: 0, teamAProb: 50, teamBProb: 50, keyEvent: "Toss won by India (Batting)" },
      { over: 25, teamAProb: 42, teamBProb: 58, keyEvent: "Starc picks 3 early wickets" },
      { over: 60, teamAProb: 65, teamBProb: 35, keyEvent: "Kohli & Pant 120-run partnership" },
      { over: 100, teamAProb: 58, teamBProb: 42, keyEvent: "Australia 180/4 in 1st innings" },
      { over: 140, teamAProb: 78, teamBProb: 22, keyEvent: "India 185/4 lead extends past 220" },
    ],
    tacticalNotes: [
      "Bumrah generating 1.8° average seam movement outside off stump.",
      "Pitch deterioration accelerated; spinner Cummins finding turn from Day 3 footmarks.",
      "Travis Head scoring at 82.5 SR against right-arm arm balls.",
    ],
  },
  {
    id: "eng-vs-sa-odi2",
    title: "2nd ODI - South Africa in England",
    series: "South Africa tour of England 2024",
    format: "ODI",
    status: "COMPLETED",
    venue: "Lord's Cricket Ground, London",
    date: "2024-09-20",
    teamA: {
      name: "England",
      code: "ENG",
      flagUrl: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=100&auto=format&fit=crop&q=80",
      scoreCard: [
        { teamName: "England", teamCode: "ENG", runs: 314, wickets: 7, overs: 50.0 },
      ],
    },
    teamB: {
      name: "South Africa",
      code: "SA",
      flagUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=100&auto=format&fit=crop&q=80",
      scoreCard: [
        { teamName: "South Africa", teamCode: "SA", runs: 288, wickets: 10, overs: 48.2 },
      ],
    },
    resultSummary: "England won by 26 runs",
    playerOfTheMatch: "Jofra Archer (4/38)",
  },
];
