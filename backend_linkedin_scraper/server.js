import { ApifyClient } from 'apify-client';
import dotenv from 'dotenv';

dotenv.config();

const client = new ApifyClient({
  token: process.env.APIFY_API_TOKEN,
});

async function runLinkedInScraper(industry, stage, location) {
  // Build LinkedIn People search URL dynamically
  const query = `Venture Capital ${industry} ${stage} ${location}`;
  const searchUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(
    query
  )}&origin=GLOBAL_SEARCH_HEADER`;

  console.log("🔍 LinkedIn Search URL:", searchUrl);

  // Run the Apify actor
  const { defaultDatasetId } = await client
    .actor('curious_coder/linkedin-people-search-scraper')
    .call({
      cookie:
        [
      ],
      searchUrl,  // ✅ required param
      resultsLimit: 50,
    });

  // Fetch dataset items
  const { items } = await client.dataset(defaultDatasetId).listItems();

  return items.map((profile) => ({
    name: profile.fullName || profile.name || "",
    title: profile.headline || profile.occupation || "",
    company: profile.company || profile.companyName || "",
    location: profile.location || "",
    profileUrl: profile.profileUrl || profile.url || "",
  }));
}

// Example usage:
(async () => {
  const results = await runLinkedInScraper("AI", "Seed", "India");
  console.log("✅ Scraped Profiles:", results);
})();
