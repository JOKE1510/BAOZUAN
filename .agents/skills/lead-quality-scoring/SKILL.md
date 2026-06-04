---
name: lead-quality-scoring
description: Use this skill when scoring, ranking, prioritizing, or explaining the quality of B2B leads for foreign trade customer development.
---

# Lead Quality Scoring

Use this skill to score B2B leads consistently before export or follow-up.

## Compliance Baseline

- Score only public company or merchant information.
- Every scored lead must have a `source_url`.
- Do not automatically send emails.
- Do not automatically send private messages.
- Do not automatically add friends, follow accounts, or send connection requests.
- Do not bypass platform restrictions, access controls, paywalls, rate limits, robots controls, or anti-bot systems.
- Do not collect private sensitive information.
- Do not score fabricated or sourceless leads.

## Score Breakdown

Total score: 100 points.

- Product relevance: 30 points
- B2B attribute: 25 points
- Contact completeness: 20 points
- Platform credibility and activity: 15 points
- Import, distribution, or engineering cooperation potential: 10 points

## Rating Levels

- A level: 80-100, priority development
- B level: 60-79, follow up when capacity allows
- C level: below 60, pause or collect more evidence

## Scoring Rules

### Product Relevance, 30 Points

- 25-30: Strong match with target products or adjacent categories.
- 15-24: Related industry, but product fit needs confirmation.
- 1-14: Weak or indirect relevance.
- 0: No product relevance found.

### B2B Attribute, 25 Points

- 20-25: Clear wholesaler, distributor, importer, contractor, MEP/fire/building materials company, or B2B supplier.
- 10-19: Company appears commercial but B2B role is unclear.
- 1-9: Mostly retail or consumer-facing.
- 0: No business identity evidence.

### Contact Completeness, 20 Points

- 16-20: Website plus at least two public contact channels.
- 10-15: One clear public contact channel.
- 1-9: Only social account or partial contact information.
- 0: No public contact channel.

### Platform Credibility and Activity, 15 Points

- 12-15: Official website, reputable directory, active company page, or consistent public presence.
- 7-11: Public listing exists but activity or credibility is limited.
- 1-6: Sparse or weak public source.
- 0: Source is not credible or cannot be verified.

### Cooperation Potential, 10 Points

- 8-10: Evidence of importing, distribution, project work, contracting, procurement, or multi-brand supply.
- 4-7: Likely potential but not explicit.
- 1-3: Low possibility.
- 0: No cooperation signal.

## Required Output

For each scored lead, output:

- Score
- Level
- Score breakdown by category
- Short scoring reason
- Source URL used for evidence

Do not score fabricated or sourceless leads.
