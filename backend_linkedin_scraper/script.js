import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

// Get Supabase credentials from environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Please check your .env file or deployment environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Load JSON file
const rawData = fs.readFileSync("d2c_linkedin_scraped_data.json");
const vcsArray = JSON.parse(rawData);

// New industry focus to add
const NEW_INDUSTRY_FOCUS = "D2C";

async function importVCs() {
  for (const vc of vcsArray) {
    try {
      // First, check if the profile already exists
      const { data: existingProfile, error: checkError } = await supabase
        .from("vcs")
        .select("id, industry_focus")
        .eq("profile_url", vc.profileUrl)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 means no rows returned, which is expected for new profiles
        console.error("❌ Error checking profile:", vc.fullName, checkError.message);
        continue;
      }

      if (existingProfile) {
        // Profile exists, update the industry_focus array
        let updatedIndustryFocus = existingProfile.industry_focus || [];
        
        // Check if the new industry focus is already in the array
        if (!updatedIndustryFocus.includes(NEW_INDUSTRY_FOCUS)) {
          updatedIndustryFocus.push(NEW_INDUSTRY_FOCUS);
          
          // Update the existing profile
          const { error: updateError } = await supabase
            .from("vcs")
            .update({ industry_focus: updatedIndustryFocus })
            .eq("id", existingProfile.id);

          if (updateError) {
            console.error("❌ Error updating profile:", vc.fullName, updateError.message);
          } else {
            console.log("🔄 Updated existing profile:", vc.fullName, "with new industry focus:", updatedIndustryFocus);
          }
        } else {
          console.log("ℹ️  Profile already has industry focus:", vc.fullName, "Industry focus:", updatedIndustryFocus);
        }
      } else {
        // Profile doesn't exist, insert new one
        const { data, error } = await supabase
          .from("vcs")
          .insert([
            {
              full_name: vc.fullName,
              location: vc.location || null,
              headline: vc.headline || null,
              profile_url: vc.profileUrl,
              email: null, // empty for now, can update later
              industry_focus: [NEW_INDUSTRY_FOCUS],
              stage_focus: ["Pre-Seed"],
            },
          ])
          .select();

        if (error) {
          console.error("❌ Error inserting new profile:", vc.fullName, error.message);
        } else {
          console.log("✅ Inserted new profile:", vc.fullName);
        }
      }
    } catch (error) {
      console.error("❌ Unexpected error processing:", vc.fullName, error.message);
    }
  }
}

importVCs();
