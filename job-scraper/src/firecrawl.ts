import axios from 'axios';
import { JobPosting, FireCrawlResponse } from './types';

export class FireCrawlClient {
  private apiKey: string;
  private baseUrl = 'https://api.firecrawl.dev/v2';

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('FireCrawl API key is required');
    }
    this.apiKey = apiKey;
  }

  /**
   * Scrape a single URL and extract job data
   */
  async scrapeJob(url: string): Promise<Partial<JobPosting>> {
    try {
      const response = await axios.post<FireCrawlResponse>(
        `${this.baseUrl}/scrape`,
        {
          url,
          formats: ['markdown'],
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      if (response.data.success && response.data.data.markdown) {
        // Parse markdown to extract job details
        const markdown = response.data.data.markdown;
        const jobData = this.parseJobFromMarkdown(markdown, url);
        return jobData;
      }

      console.error(`Failed to scrape ${url}:`, response.data);
      return { job_url: url };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`Error scraping ${url}:`, errorMessage);
      throw error;
    }
  }

  /**
   * Parse job details from markdown content
   */
  private parseJobFromMarkdown(markdown: string, url: string): Partial<JobPosting> {
    const lines = markdown.split('\n');
    
    let title = '';
    let company = '';
    let salary = '';
    let location = '';
    let description = '';
    const skills: string[] = [];

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      
      if (!title && (line.includes('Job Title') || line.includes('Title'))) {
        title = line.split(':').slice(1).join(':').trim() || 'Job Opening';
      }
      if (!company && (line.includes('Company') && !line.includes('Company URL'))) {
        company = line.split(':').slice(1).join(':').trim() || 'TechCompany';
      }
      if (!location && (lowerLine.includes('location') || lowerLine.includes('based in'))) {
        location = line.split(':').slice(1).join(':').trim() || 'Remote';
      }
      if (!salary && (lowerLine.includes('salary') || lowerLine.includes('hourly') || lowerLine.includes('$'))) {
        salary = line;
      }
      if (lowerLine.includes('node') || lowerLine.includes('javascript') || lowerLine.includes('typescript') || lowerLine.includes('react') || lowerLine.includes('python')) {
        skills.push(line.trim());
      }
      if (description.length < 200) {
        description += ' ' + line;
      }
    }

    // Extract salary range
    let salaryMin = '';
    let salaryMax = '';
    const salaryMatch = salary.match(/\$[\d,]+/g);
    if (salaryMatch && salaryMatch.length >= 2) {
      salaryMin = salaryMatch[0].replace(/[$,]/g, '');
      salaryMax = salaryMatch[1].replace(/[$,]/g, '');
    } else if (salaryMatch && salaryMatch.length === 1) {
      salaryMin = salaryMatch[0].replace(/[$,]/g, '');
    }

    return {
      title: title || 'Software Developer',
      company: company || 'Tech Company',
      location: location || 'Remote',
      remote_type: 'remote',
      job_type: 'full-time',
      salary_min: salaryMin || null,
      salary_max: salaryMax || null,
      salary_currency: 'USD',
      skills_required: skills.length > 0 ? skills : ['Node.js', 'JavaScript', 'TypeScript'],
      description: description.substring(0, 500).trim(),
      job_url: url,
    };
  }

  /**
   * Batch scrape multiple job URLs
   */
  async batchScrapeJobs(urls: string[]): Promise<Partial<JobPosting>[]> {
    const results: Partial<JobPosting>[] = [];

    // Process in batches of 5 to avoid rate limiting
    const batchSize = 5;
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);

      const batchPromises = batch.map((url) =>
        this.scrapeJob(url).catch((error) => {
          console.error(`Batch error for ${url}:`, error);
          return { job_url: url };
        })
      );

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Add delay between batches
      if (i + batchSize < urls.length) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    return results;
  }

  /**
   * Search for jobs across the web
   */
  async searchJobs(query: string, limit: number = 20): Promise<string[]> {
    try {
      const response = await axios.post<FireCrawlResponse>(
        `${this.baseUrl}/search`,
        {
          query,
          limit,
          formats: ['links'],
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      if (response.data.success && response.data.data.links) {
        return response.data.data.links.map((link) => link.url);
      }

      return [];
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Error searching jobs:', errorMessage);
      return [];
    }
  }
}
