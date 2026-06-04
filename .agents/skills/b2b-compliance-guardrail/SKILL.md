---
name: b2b-compliance-guardrail
description: Use this skill as a compliance guardrail for B2B lead generation, web research, scraping, outreach preparation, CRM enrichment, and customer data export workflows.
---

# B2B Compliance Guardrail

Use this skill to prevent non-compliant automation in B2B lead research and customer data workflows.

## Hard Prohibitions

Do not perform or assist with:

- Automatic email sending
- Automatic private messaging
- Automatic friend requests, follows, or connection requests
- Automatic login to third-party platforms for bulk scraping
- Bypassing platform restrictions, access controls, paywalls, rate limits, robots controls, or anti-bot systems
- Collecting private sensitive information
- Generating leads, contacts, company information, or scores without sources
- Exporting any lead that does not preserve a `source_url`

## Allowed Work

Allowed when based on public visible information:

- Search public web pages.
- Scrape public company websites.
- Extract public company profile, products, website, public email, public phone, and public social links.
- Record public company social page URLs and public bios.
- Score leads using sourced evidence.
- Prepare manual outreach drafts without sending them automatically.
- Export sourced lead data to Excel.

## Required Checks

Before collecting or exporting lead data, verify:

- The information is public and visible without bypassing restrictions.
- The `source_url` is stored and preserved through scoring and export.
- The data is company or merchant information, not private sensitive personal data.
- The user request does not require automatic outreach or platform-restricted scraping.

## Refusal and Safe Alternative

If a request asks for prohibited automation, refuse that part briefly and offer a compliant alternative.

Examples:

- Instead of auto-sending emails, prepare draft email templates for manual review.
- Instead of auto-DM on social platforms, record public company page URLs and visible public contact links.
- Instead of logging in to scrape a platform, use public search results, official websites, yellow pages, or public B2B directories.

## Source Integrity

Never create or export a lead without a source. If a field cannot be verified from a public source, leave it blank or mark it as `unknown`.
