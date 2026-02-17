import { z } from 'zod';

// Job posting schema
export const JobPostingSchema = z.object({
  title: z.string(),
  company: z.string(),
  salary_min: z.string().nullable().optional(),
  salary_max: z.string().nullable().optional(),
  salary_currency: z.string().optional().default('USD'),
  location: z.string(),
  remote_type: z.enum(['remote', 'hybrid', 'on-site']).default('remote'),
  job_type: z.enum(['full-time', 'part-time', 'contract', 'freelance']).default('full-time'),
  skills_required: z.array(z.string()).default([]),
  description: z.string(),
  job_url: z.string().url(),
  posted_date: z.string().optional(),
  company_url: z.string().url().optional(),
});

export type JobPosting = z.infer<typeof JobPostingSchema>;

// Filter criteria for jobs
export interface JobFilterCriteria {
  keywords: string[]; // Node.js, JavaScript, TypeScript, AI
  remoteOnly: boolean;
  excludeCountries: string[]; // Exclude India
  includeCountries?: string[]; // USA, Europe, Canada, Australia
  minHourlyRate: number; // $15
  maxHourlyRate: number; // $20
  jobTypes: ('full-time' | 'part-time' | 'contract' | 'freelance')[]; // All types
}

// Scraper result
export interface ScraperResult {
  success: boolean;
  jobsScraped: number;
  jobsFiltered: number;
  jobs: JobPosting[];
  errors: string[];
  timestamp: string;
}

// FireCrawl response
export interface FireCrawlResponse {
  success: boolean;
  data: {
    markdown?: string;
    html?: string;
    rawHtml?: string;
    json?: Record<string, any>;
    links?: Array<{ url: string; title?: string }>;
    screenshot?: string;
  };
  metadata?: {
    statusCode: number;
    headers?: Record<string, string>;
  };
}

// Batch scrape job data
export interface BatchScrapedJob {
  url: string;
  data: Partial<JobPosting>;
  success: boolean;
  error?: string;
}
