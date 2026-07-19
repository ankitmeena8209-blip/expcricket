import { createClient } from "@supabase/supabase-js";

const url = "https://lzrbjqzqvlysoidcqhkc.supabase.co";
const key = "sb_publishable_nViVAHkIROBa0XI_Jd84nA_o-gTGrUF";

const client = createClient(url, key);

async function test() {
  console.time("supabase-query");
  try {
    const { data, error } = await client.from("players").select("*").timeout?.(3000) || await client.from("players").select("*");
    console.timeEnd("supabase-query");
    console.log("Data:", data);
    console.log("Error:", error);
  } catch (err) {
    console.timeEnd("supabase-query");
    console.error("Exception:", err);
  }
}

test();
