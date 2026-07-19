export interface PromptPreset {
  id: string;
  category: "Matchup" | "Pitch" | "Fantasy" | "Tactical";
  title: string;
  prompt: string;
  icon: string;
}

export const AI_PROMPT_PRESETS: PromptPreset[] = [
  {
    id: "kohli-vs-zampa-mcg",
    category: "Matchup",
    title: "Kohli vs Adam Zampa at MCG",
    prompt: "Analyze Virat Kohli's historical batting performance against Adam Zampa at Melbourne Cricket Ground across ODI and T20I formats. Highlight dismissal modes, strike rate in middle overs, and risk factors.",
    icon: "radar",
  },
  {
    id: "mcg-pitch-wtc",
    category: "Pitch",
    title: "MCG Pitch & Seam Movement Forecast",
    prompt: "Evaluate surface behavior at MCG for Days 1 to 5 in Test matches. What is the seam movement index, expected spin assistance on Day 4/5, and optimal toss decision?",
    icon: "stadium",
  },
  {
    id: "bgt-fantasy-captains",
    category: "Fantasy",
    title: "Border-Gavaskar Fantasy XI Top Picks",
    prompt: "Generate the top 5 highest projected fantasy points players for the upcoming MCG Test match. Include captain/vice-captain recommendation with risk probability score.",
    icon: "monetization_on",
  },
  {
    id: "head-powerplay-strategy",
    category: "Tactical",
    title: "Travis Head Powerplay Pace Counter",
    prompt: "Formulate a bowling attack tactic to restrict Travis Head in the first 6 overs of a T20 match. Should right-arm pacers bowl full outside off or test him with short-pitch bodyline bowling?",
    icon: "psychology",
  },
];
