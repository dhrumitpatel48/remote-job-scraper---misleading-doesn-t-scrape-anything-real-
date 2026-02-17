import { JobPosting, JobFilterCriteria } from './types';

export class JobFilter {
  /**
   * Check if job matches filter criteria
   */
  static matchesCriteria(job: Partial<JobPosting>, criteria: JobFilterCriteria): boolean {
    // Check remote type
    if (criteria.remoteOnly && job.remote_type !== 'remote') {
      return false;
    }

    // Check job type
    if (!criteria.jobTypes.includes((job.job_type || 'full-time') as any)) {
      return false;
    }

    // Check location - exclude India, include specified countries
    if (job.location) {
      const locationLower = job.location.toLowerCase();

      // Exclude India
      if (criteria.excludeCountries.some((country) => locationLower.includes(country.toLowerCase()))) {
        return false;
      }

      // Include countries filter - if specified, must match one of them
      if (criteria.includeCountries && criteria.includeCountries.length > 0) {
        const matchesIncludeCountry = criteria.includeCountries.some((country) =>
          locationLower.includes(country.toLowerCase())
        );
        if (!matchesIncludeCountry && locationLower !== 'remote') {
          return false;
        }
      }
    }

    // Check skills
    if (!this.hasRequiredSkills(job, criteria.keywords)) {
      return false;
    }

    // Check salary range if provided
    if (criteria.minHourlyRate || criteria.maxHourlyRate) {
      if (!this.checkSalaryRange(job, criteria.minHourlyRate, criteria.maxHourlyRate)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if job has required skills
   */
  private static hasRequiredSkills(job: Partial<JobPosting>, keywords: string[]): boolean {
    const jobText = [
      job.title || '',
      job.description || '',
      (job.skills_required || []).join(' '),
    ]
      .join(' ')
      .toLowerCase();

    return keywords.some((keyword) => jobText.includes(keyword.toLowerCase()));
  }

  /**
   * Check if salary falls within expected hourly rate
   */
  private static checkSalaryRange(job: Partial<JobPosting>, minHourly: number, maxHourly: number): boolean {
    // If no salary info, we're flexible and accept it
    if (!job.salary_min && !job.salary_max) {
      return true;
    }

    // Try to extract hourly rate from salary
    const salaryText = [job.salary_min || '', job.salary_max || ''].join(' ').toLowerCase();

    // If it explicitly mentions hourly/hour, check the number
    if (salaryText.includes('hour') || salaryText.includes('hr')) {
      const numbers = salaryText.match(/\d+/g);
      if (numbers) {
        const rate = parseInt(numbers[0]);
        return rate >= minHourly && rate <= maxHourly;
      }
    }

    // For annual salaries, estimate hourly (40 hours/week, 52 weeks/year = 2080 hours)
    const minNum = parseInt(job.salary_min || '0');
    const maxNum = parseInt(job.salary_max || '0');

    if (minNum > 0 || maxNum > 0) {
      const estimatedHourly = (minNum || maxNum) / 2080;
      return estimatedHourly >= minHourly && estimatedHourly <= maxHourly * 2; // More lenient for annual
    }

    return true;
  }

  /**
   * Sort jobs by relevance
   */
  static sortByRelevance(jobs: Partial<JobPosting>[], keywords: string[]): Partial<JobPosting>[] {
    return jobs.sort((a, b) => {
      const aScore = this.calculateRelevanceScore(a, keywords);
      const bScore = this.calculateRelevanceScore(b, keywords);
      return bScore - aScore;
    });
  }

  /**
   * Calculate relevance score for a job
   */
  private static calculateRelevanceScore(job: Partial<JobPosting>, keywords: string[]): number {
    let score = 0;
    const jobText = [
      job.title || '',
      job.description || '',
      (job.skills_required || []).join(' '),
    ]
      .join(' ')
      .toLowerCase();

    // Score based on keyword matches
    keywords.forEach((keyword) => {
      const keywordLower = keyword.toLowerCase();
      if (job.title?.toLowerCase().includes(keywordLower)) {
        score += 3; // Title match is most relevant
      }
      if (job.skills_required?.some((skill) => skill.toLowerCase().includes(keywordLower))) {
        score += 2; // Skills match
      }
      if (job.description?.toLowerCase().includes(keywordLower)) {
        score += 1; // Description match
      }
    });

    return score;
  }
}
