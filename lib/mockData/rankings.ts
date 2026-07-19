export interface RankingItem {
  rank: number;
  playerName: string;
  country: string;
  countryCode: string;
  rating: number;
  change: "UP" | "DOWN" | "SAME";
}

export const MOCK_RANKINGS = {
  BATTER: {
    TEST: [
      { rank: 1, playerName: "Joe Root", country: "England", countryCode: "ENG", rating: 899, change: "SAME" },
      { rank: 2, playerName: "Kane Williamson", country: "New Zealand", countryCode: "NZ", rating: 859, change: "SAME" },
      { rank: 3, playerName: "Daryl Mitchell", country: "New Zealand", countryCode: "NZ", rating: 768, change: "UP" },
      { rank: 4, playerName: "Steve Smith", country: "Australia", countryCode: "AUS", rating: 757, change: "DOWN" },
      { rank: 5, playerName: "Virat Kohli", country: "India", countryCode: "IND", rating: 748, change: "UP" },
    ] as RankingItem[],
    ODI: [
      { rank: 1, playerName: "Virat Kohli", country: "India", countryCode: "IND", rating: 791, change: "UP" },
      { rank: 2, playerName: "Babar Azam", country: "Pakistan", countryCode: "PAK", rating: 786, change: "DOWN" },
      { rank: 3, playerName: "Rohit Sharma", country: "India", countryCode: "IND", rating: 764, change: "SAME" },
      { rank: 4, playerName: "Shubman Gill", country: "India", countryCode: "IND", rating: 755, change: "SAME" },
      { rank: 5, playerName: "Travis Head", country: "Australia", countryCode: "AUS", rating: 742, change: "UP" },
    ] as RankingItem[],
    T20I: [
      { rank: 1, playerName: "Travis Head", country: "Australia", countryCode: "AUS", rating: 855, change: "SAME" },
      { rank: 2, playerName: "Suryakumar Yadav", country: "India", countryCode: "IND", rating: 821, change: "SAME" },
      { rank: 3, playerName: "Phil Salt", country: "England", countryCode: "ENG", rating: 798, change: "UP" },
      { rank: 4, playerName: "Babar Azam", country: "Pakistan", countryCode: "PAK", rating: 752, change: "DOWN" },
      { rank: 5, playerName: "Yashasvi Jaiswal", country: "India", countryCode: "IND", rating: 745, change: "UP" },
    ] as RankingItem[],
  },
  BOWLER: {
    TEST: [
      { rank: 1, playerName: "Jasprit Bumrah", country: "India", countryCode: "IND", rating: 870, change: "SAME" },
      { rank: 2, playerName: "Ravichandran Ashwin", country: "India", countryCode: "IND", rating: 849, change: "SAME" },
      { rank: 3, playerName: "Kagiso Rabada", country: "South Africa", countryCode: "SA", rating: 834, change: "UP" },
      { rank: 4, playerName: "Pat Cummins", country: "Australia", countryCode: "AUS", rating: 820, change: "DOWN" },
      { rank: 5, playerName: "Josh Hazlewood", country: "Australia", countryCode: "AUS", rating: 812, change: "SAME" },
    ] as RankingItem[],
    ODI: [
      { rank: 1, playerName: "Keshav Maharaj", country: "South Africa", countryCode: "SA", rating: 687, change: "SAME" },
      { rank: 2, playerName: "Josh Hazlewood", country: "Australia", countryCode: "AUS", rating: 679, change: "UP" },
      { rank: 3, playerName: "Adam Zampa", country: "Australia", countryCode: "AUS", rating: 670, change: "SAME" },
      { rank: 4, playerName: "Jasprit Bumrah", country: "India", countryCode: "IND", rating: 665, change: "SAME" },
      { rank: 5, playerName: "Kuldeep Yadav", country: "India", countryCode: "IND", rating: 650, change: "UP" },
    ] as RankingItem[],
    T20I: [
      { rank: 1, playerName: "Adil Rashid", country: "England", countryCode: "ENG", rating: 721, change: "SAME" },
      { rank: 2, playerName: "Akeal Hosein", country: "West Indies", countryCode: "WI", rating: 695, change: "UP" },
      { rank: 3, playerName: "Rashid Khan", country: "Afghanistan", countryCode: "AFG", rating: 682, change: "DOWN" },
      { rank: 4, playerName: "Anrich Nortje", country: "South Africa", countryCode: "SA", rating: 670, change: "SAME" },
      { rank: 5, playerName: "Jofra Archer", country: "England", countryCode: "ENG", rating: 658, change: "UP" },
    ] as RankingItem[],
  },
};
