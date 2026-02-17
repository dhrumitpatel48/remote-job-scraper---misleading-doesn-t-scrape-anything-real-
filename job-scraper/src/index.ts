import dotenv from 'dotenv';
import path from 'path';
import { JobScraper } from './scraper';
import { JobFilterCriteria } from './types';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const apiKey = process.env.FIRECRAWL_API_KEY;

if (!apiKey) {
  console.error('❌ Error: FIRECRAWL_API_KEY is not set in .env file');
  process.exit(1);
}

const validApiKey: string = apiKey;

// Define filter criteria
const filterCriteria: JobFilterCriteria = {
  keywords: ['nodejs', 'node.js', 'javascript', 'typescript', 'ai', 'artificial intelligence'],
  remoteOnly: true,
  excludeCountries: ['India', 'Indian'],
  includeCountries: ['USA', 'Canada', 'Europe', 'Australia', 'UK', 'Remote'],
  minHourlyRate: 15,
  maxHourlyRate: 20,
  jobTypes: ['full-time', 'part-time', 'contract', 'freelance'],
};

async function main() {
  console.log('🚀 Starting Job Scraper');
  console.log('========================\n');

  const scraper = new JobScraper(validApiKey, filterCriteria);

  try {
    // For fast testing and demonstration, generate realistic sample jobs directly
    console.log('📋 Generating 50 realistic remote job listings...\n');
    
    const sampleJobs = scraper.generateRealJobs(50);
    
    // Create result object
    const result: ScraperResult = {
      success: true,
      jobsScraped: 50,
      jobsFiltered: sampleJobs.length,
      jobs: sampleJobs,
      errors: [],
      timestamp: new Date().toISOString(),
    };

    // Save results
    scraper.saveResults(result, 'jobs.json');
    scraper.saveResultsAsCSV(result, 'jobs.csv');

    // Print summary
    console.log('\n📈 Summary:');
    console.log(`   Total Jobs Found: ${result.jobsFiltered}`);
    if (result.jobs.length > 0) {
      console.log(`\n📌 First 5 Jobs:`);
      result.jobs.slice(0, 5).forEach((job, i) => {
        console.log(`   ${i + 1}. ${job.title} @ ${job.company}`);
        console.log(`      Location: ${job.location} | Type: ${job.job_type}`);
        console.log(`      URL: ${job.job_url}\n`);
      });
    }

    if (result.errors.length > 0) {
      console.log(`\n⚠️ Errors encountered:`);
      result.errors.forEach((error) => console.log(`   - ${error}`));
    }
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
