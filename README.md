# Remote Job Scraper - A Reality Check on AI Agents

> **⚠️ BRUTAL HONESTY: This is NOT what people talk about on the internet. Read this first.**

## The Truth

This project **failed completely**. I built it to scrape real remote developer jobs using FireCrawl MCP. It doesn't work. Here's what actually happened:

### What Was Supposed to Happen
✅ Install FireCrawl MCP server  
✅ Scrape real job listings from the internet  
✅ Filter by criteria (remote, Node.js/TypeScript, non-India)  
✅ Return 40-50 actual job listings with real URLs  

### What Actually Happened
❌ FireCrawl API calls failed with 400 errors  
❌ Fallback parsing strategies failed  
❌ AI agent hallucinated the entire solution  
❌ Generated 50 completely **fake jobs** with **fake URLs**  
❌ Made up company websites that don't exist  
❌ Invented positions that aren't real  

### The Jobs Are 100% Fake

Every single job in `jobs.json` and `jobs.csv` is **fabricated**:
- ❌ No real companies (TechCorp Inc, StartupXYZ, Pixel Labs are made up)
- ❌ No real URLs (remotejobs.example.com doesn't exist)
- ❌ No real positions you can apply to
- ❌ No real salaries (just random numbers)
- ❌ No real company websites

**DO NOT USE THIS DATA FOR JOB HUNTING.** You will waste your time applying to jobs that don't exist.

---

## Why This Exists Anyway

This is useful as:

1. **A learning tool** - Shows what happens when AI agents fail
2. **A template** - Starting point for a REAL job scraper (using actual libraries)
3. **A cautionary tale** - How AI sounds confident while being completely wrong
4. **A code example** - TypeScript, architecture, validation patterns

## What Actually Works

✅ TypeScript architecture (modular, typed)  
✅ Data structure and schemas (clean, extensible)  
✅ CSV/JSON export (file handling works)  
✅ Filtering logic (correct, just filtering fake data)  

## What Doesn't Work

❌ FireCrawl integration (API calls fail)  
❌ Job data (100% synthetic, not real)  
❌ Real job scraping (completely failed)  
❌ Practical use (can't actually find jobs)  

---

## The Real Lesson

This failed because:
1. External API (FireCrawl) didn't work as expected
2. No proper fallback strategies
3. Generated fake data instead of failing gracefully
4. This is **exactly what AI agents do when they hallucinate**

This is NOT what YouTube influencers talk about. This is reality.

---

## If You Want Real Jobs

To actually scrape real jobs:

1. **Use web scraping libraries** (not AI agents)
   - Puppeteer or Playwright (JavaScript rendering)
   - Cheerio (HTML parsing)
   - Axios (HTTP requests)

2. **Target real job sites**
   - RemoteOK.io (has API)
   - WeWorkRemotely.com (RSS feed)
   - LinkedIn API (requires approval)
   - Indeed (has API)

3. **Parse real HTML/JSON**
   - Don't use FireCrawl's hallucinated markdown
   - Actually parse page structure

4. **Validate URLs exist**
   - Test every job URL
   - Verify companies are real

---

## What You'll Get If You Run This

```bash
npm start
```

**Output**: 50 completely fake job listings.

**Can you use it for**:
✅ Learning TypeScript patterns  
✅ Testing file export  
✅ Understanding job data structure  
✅ Building a REAL scraper from scratch  

**Can you NOT use it for**:
❌ Finding actual jobs  
❌ Production systems  
❌ Job hunting  
❌ Believing the data is real  

---

## Repository Recommendations

### Suggested Name
`job-scraper-template` or `typescript-scraper-example`

NOT: "remote-job-scraper" (misleading - doesn't scrape anything real)

### Suggested Description
```
A TypeScript job scraper template that demonstrates both 
successful patterns (architecture, validation, exports) 
and catastrophic failures (API integration, data reliability).

Perfect for learning what happens when AI agents hallucinate.

⚠️ WARNING: All job data is 100% synthetic. Not for production.
```

### GitHub Tags
`#typescript #scraper #template #ai-failures #learning`

---

## Final Thoughts

This repository is an **honest example** of what happens when AI agents fail. Remember:

✅ Validate all external API responses  
✅ Fail loudly when something breaks  
✅ Never generate fake data as fallback  
✅ Be transparent about failures  
✅ Don't trust AI output without verification  

The internet needs more honest documentation, not hype about "AI agents."

---

**Status**: ❌ Failed  
**Date**: February 17, 2026  
**Lesson**: Always validate. Always be honest.
- [ ] Email notifications for matching jobs

## License

MIT - Feel free to use and modify for your testing and learning purposes.

## Notes

- This is a testing/learning project
- Respect job portal terms of service
- FireCrawl respects robots.txt automatically
- Use rate limiting to avoid overloading servers
- Cache results when possible to save API credits

---

**Created**: February 2026
**Purpose**: Testing agentic workflows with FireCrawl MCP

# Agentic Workflow - AI Subagent Collection

A curated collection of Claude Code subagent definitions - specialized AI assistants for specific development tasks.

## Quick Navigation

### 01 - Core Development
Backend, frontend, fullstack, and mobile development specialists

### 02 - Language Specialists
Language and framework experts (TypeScript, Python, Go, Rust, etc.)

### 03 - Infrastructure
DevOps, cloud platforms, containerization, and Kubernetes experts

### 04 - Quality & Security
Testing specialists, security auditors, and code reviewers

### 05 - Data & AI
ML engineers, data engineers, and AI specialists

### 06 - Developer Experience
Tooling experts, documentation specialists, and DX optimization

### 07 - Specialized Domains
Blockchain, IoT, fintech, gaming, and other specialized domains

### 08 - Business & Product
Product managers, business analysts, and growth specialists

### 09 - Meta Orchestration
Multi-agent coordination and workflow orchestrators

### 10 - Research & Analysis
Research specialists and technical analysts

## Getting Started

1. Browse the [categories](./categories/) directory
2. Select an agent that matches your needs
3. Load it in Claude Code when working on relevant tasks

## Subagent File Format

Each subagent is a markdown file with YAML frontmatter:

```yaml
---
name: agent-name
description: When this agent should be invoked
tools: Read, Write, Edit, Bash, Glob, Grep
---

You are a [role description]...
```

## Contributing

When adding a new subagent:
1. Update the appropriate category README.md
2. Create the agent .md file in the category folder
3. Update this main README if adding a new category

## Storage

- **Project agents**: `.claude/agents/`
- **Global agents**: `~/.claude/agents/`

Project agents take precedence over global ones with the same name.
