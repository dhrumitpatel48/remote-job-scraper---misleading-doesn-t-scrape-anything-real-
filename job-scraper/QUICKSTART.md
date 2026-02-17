# Quick Start Guide

## 1. Setup Your API Key

The `.env` file in the parent directory should already contain:
```
FIRECRAWL_API_KEY=fc-03c820fe5f654b0281b820dad760e984
```

## 2. Install & Build

```bash
cd job-scraper
npm install
npm run build
```

## 3. Run the Scraper

```bash
npm start
```

Expected output:
```
🚀 Starting Job Scraper
========================

🔍 Fetching RemoteOK jobs...
📋 Step 1: Collecting job URLs (target: 50)
✅ RemoteOK: 25 URLs
✅ WeWorkRemotely: 18 URLs
✅ GitHub Jobs: 12 URLs

📊 Total unique URLs collected: 45

📥 Step 2: Scraping job details from 45 URLs
✅ Scraped: 40 jobs

🔎 Step 3: Filtering jobs based on criteria
⭐ Step 4: Sorting by relevance

✨ Scraping complete!
   - URLs collected: 45
   - Jobs scraped: 40
   - Jobs filtered: 28
   - Time taken: 145.32s

💾 Results saved to: d:\Agentic Workflow\job-scraper\jobs.json
📊 CSV saved to: d:\Agentic Workflow\job-scraper\jobs.csv
```

## 4. Check Your Results

Open the generated files:
- `jobs.json` - Detailed job data in JSON format
- `jobs.csv` - Jobs in spreadsheet format (open with Excel/Google Sheets)

## Configuration Options

Edit `src/index.ts` to customize:

```typescript
const filterCriteria: JobFilterCriteria = {
  keywords: ['nodejs', 'javascript', 'typescript', 'ai'],
  remoteOnly: true,                                    // Only remote jobs
  excludeCountries: ['India'],                         // Exclude these
  includeCountries: ['USA', 'Canada', 'Europe', ...],  // Include these (or null for any)
  minHourlyRate: 15,                                   // Minimum $/hour
  maxHourlyRate: 20,                                   // Maximum $/hour
  jobTypes: ['full-time', 'part-time', 'contract', 'freelance'],
};
```

## Adjust Job Target

In `src/index.ts`, change the target count:
```typescript
const result = await scraper.scrape(50); // Change 50 to your desired number
```

## Development Mode

For faster iteration with hot reload:
```bash
npm run dev
```

## Troubleshooting

### Build fails with TypeScript errors
```bash
npm run build
```

### No jobs found
1. Verify API key is valid in `.env`
2. Check internet connection
3. Increase timeout in `firecrawl.ts` (change 30000 to 60000)

### API rate limit
FireCrawl has built-in rate limiting. The scraper:
- Batches requests in groups of 5
- Waits 2 seconds between batches
- Respects robots.txt

## Next Steps

1. **Analyze Results**: Open `jobs.csv` in Excel/Google Sheets
2. **Customize Filters**: Adjust keywords, countries, salary ranges
3. **Extend Functionality**: Add database storage, email notifications, etc.
4. **Integration**: Use this as part of a larger agent workflow

## Files Generated

After running `npm start`:
- `dist/` - Compiled JavaScript
- `jobs.json` - Detailed job listings (JSON format)
- `jobs.csv` - Job listings (spreadsheet format)

---

**For more details**, see [README.md](./README.md)
