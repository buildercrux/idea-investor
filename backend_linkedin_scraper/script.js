import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Load JSON file
const rawData = fs.readFileSync("vcs4.json");
const vcsArray = JSON.parse(rawData);

async function importVCs() {
  for (const vc of vcsArray) {
    const { data, error } = await supabase
      .from("vcs")
      .insert([
        {
          full_name: vc.fullName,
          location: vc.location || null,
          headline: vc.headline || null,
          profile_url: vc.profileUrl,
          email: null, // empty for now, can update later
          industry_focus: ["Blockchain"],
          stage_focus: ["Pre-Seed"],
        },
      ])
      .select();

    if (error) {
      console.error("❌ Error inserting:", vc.fullName, error.message);
    } else {
      console.log("✅ Inserted:", vc.fullName);
    }
  }
}

importVCs();
