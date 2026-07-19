export const siteConfig = {
  name: "EXP Cricket",
  fullName: "Xpert Cricket",
  description: "High-Performance Cricket Intelligence & AI Analytics Platform",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  mainNav: [
    {
      title: "Command Center",
      href: "/",
      icon: "dashboard",
    },
    {
      title: "Player Intelligence",
      href: "/player-intelligence",
      icon: "person",
      badge: "LIVE",
    },
    {
      title: "Ground Intelligence",
      href: "/ground-intelligence",
      icon: "stadium",
    },
    {
      title: "AI Cricket Analyst",
      href: "/ai-analyst",
      icon: "psychology",
      badge: "AI PRO",
    },
    {
      title: "Compare Engine",
      href: "/compare",
      icon: "compare_arrows",
    },
    {
      title: "Team Analysis",
      href: "/team-analysis",
      icon: "groups",
    },
    {
      title: "Rankings",
      href: "/rankings",
      icon: "leaderboard",
    },
    {
      title: "Match Analytics",
      href: "/match-analysis",
      icon: "sports_cricket",
    },
    {
      title: "Global Search",
      href: "/search",
      icon: "search",
    },
    {
      title: "Favorites",
      href: "/favorites",
      icon: "star",
    },
    {
      title: "Admin Portal",
      href: "/admin",
      icon: "admin_panel_settings",
      badge: "SECURE",
    },
  ],
  footerNav: [
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "FAQ", href: "/faq" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms & Conditions", href: "/terms" },
    { title: "Disclaimer", href: "/disclaimer" },
  ],
};
