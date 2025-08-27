import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient('https://ksnahcnxcotuyhtzadbi.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzbmFoY254Y290dXlodHphZGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3NzE2MTcsImV4cCI6MjA3MTM0NzYxN30.fSI5_j-6VTNDw5XS82v25cKNLmUmR2Ur4gZkmMuH9uA');

// Load JSON file
const rawData = fs.readFileSync("vcs5.json");
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
          industry_focus: ["SaaS"],
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
