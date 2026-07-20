import { CricketDataService } from "../services/cricketDataService";
import { supabase } from "../lib/supabase";

async function runFullSync() {
  console.log("==================================================");
  console.log("   EXP CRICKET - CRICKETDATA.ORG FULL DATA SYNC   ");
  console.log("==================================================");

  const result = await CricketDataService.syncAllData();

  if (result.success) {
    console.log("\n✅ INITIAL DATA IMPORT COMPLETED SUCCESSFULLY!");
    console.log(`- Players Imported: ${result.syncedPlayersCount}`);
    console.log(`- Teams Imported:   ${result.syncedTeamsCount}`);
    console.log(`- Grounds Imported: ${result.syncedGroundsCount}`);
    console.log(`- Matches Imported: ${result.syncedMatchesCount}`);

    // Verify row counts in Supabase
    console.log("\n--- VERIFYING LIVE SUPABASE DATABASE TABLES ---");
    const { count: teamCount } = await supabase.from("teams").select("*", { count: "exact", head: true });
    const { count: groundCount } = await supabase.from("grounds").select("*", { count: "exact", head: true });
    const { count: matchCount } = await supabase.from("matches").select("*", { count: "exact", head: true });
    const { count: playerCount } = await supabase.from("players").select("*", { count: "exact", head: true });

    console.log(`📊 Supabase 'teams' table row count:   ${teamCount ?? 0}`);
    console.log(`📊 Supabase 'grounds' table row count: ${groundCount ?? 0}`);
    console.log(`📊 Supabase 'matches' table row count: ${matchCount ?? 0}`);
    console.log(`📊 Supabase 'players' table row count: ${playerCount ?? 0}`);
    console.log("==================================================");
  } else {
    console.error("❌ Sync Error:", result.error);
    process.exit(1);
  }
}

runFullSync().catch((err) => {
  console.error("Fatal exception during sync execution:", err);
  process.exit(1);
});
