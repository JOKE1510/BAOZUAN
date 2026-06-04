---
name: b2b-lead-research
description: Use this skill when searching, collecting, validating, or summarizing foreign trade B2B leads from public sources, especially wholesalers, distributors, MEP contractors, fire protection contractors, building material suppliers, and related company websites or directories.
---

# B2B Lead Research

Use this skill to search for foreign trade B2B customer leads from public, visible sources.

## Core Rules

- Collect only public company or merchant information.
- Prioritize wholesalers, distributors, MEP contractors, fire protection contractors, building material suppliers, importers, project contractors, and trade companies.
- Every lead must include at least one `source_url`.
- Do not automatically send emails.
- Do not automatically send private messages.
- Do not automatically add friends, follow accounts, or send connection requests.
- Do not bypass platform restrictions, access controls, paywalls, rate limits, robots controls, or anti-bot systems.
- Do not collect private sensitive information, private personal profiles, personal IDs, private addresses, or non-public contact details.
- Do not invent leads, contact details, company names, or business descriptions.
- Do not output any lead that has no source.
- Prefer official websites, public business directories, public maps listings, public company pages, public yellow pages, and public B2B directories.

## Research Workflow

1. Define the target market, product category, and customer type before searching.
2. Search public sources using product, industry, location, and customer-type keywords.
3. Extract only fields visible in the public source.
4. Cross-check important leads with another public source when possible.
5. Keep the source URL for every extracted fact, especially company name, website, contact channels, products, and location.
6. Mark unclear or unverified fields as empty or `unknown`; do not guess.

## Lead Requirements

Each lead should include:

- Company name
- Country and city if publicly available
- Customer type
- Platform or source type
- Website or public account URL if available
- Public email, phone, WhatsApp, Zalo, or social links if visible
- Main products or services
- Recommended development products
- Source URL
- Short evidence note explaining why the lead is relevant

## Search Keyword Guidance

Combine product keywords with B2B role keywords:

- `wholesaler`, `distributor`, `supplier`, `importer`
- `MEP contractor`, `fire protection contractor`, `fire fighting contractor`
- `building materials`, `construction supplier`, `engineering company`
- Country, city, and local-language terms when useful

## Output Standard

Return leads in a structured table or JSON-like list. Never include a customer without a `source_url`.
