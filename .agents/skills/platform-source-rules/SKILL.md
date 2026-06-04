---
name: platform-source-rules
description: Use this skill when collecting B2B lead data from Google Search, Google Maps, company websites, public social pages, yellow pages, and B2B directories while respecting platform limits and public-only rules.
---

# Platform Source Rules

Use this skill to decide what can be collected from each platform for B2B lead research.

## Global Rules

- Collect only public, visible company or merchant information.
- Every lead must include at least one `source_url`.
- Do not log in automatically to third-party platforms for bulk scraping.
- Do not automatically send emails.
- Do not send private messages.
- Do not add friends or follow accounts automatically.
- Do not bypass platform restrictions, rate limits, paywalls, robots controls, or access controls.
- Do not collect private sensitive information.
- Always keep the source link for collected information.

## Platform Rules

### Google Search

Allowed:

- Search for public company pages, directories, official websites, public listings, and public contact pages.
- Extract company name, website, public description, public contact info, and source URL.

### Google Maps

Allowed:

- Extract public business name, address area, category, public website, phone, rating, and listing URL when visible.
- Use only public listing information.

### Company Website

Allowed:

- Extract company profile, product categories, public emails, public phone numbers, contact forms, WhatsApp/Zalo links, social links, and address shown on the website.
- Prefer official contact and about pages.

### Facebook Public Page

Allowed:

- Record public page URL, page name, public intro, public website, public email/phone if visible, and public posts only as activity signals.

Not allowed:

- Automatic login, private message automation, friend requests, closed-group scraping, or non-public data collection.

### LinkedIn Company Page

Allowed:

- Record public company page URL, company name, public description, website, industry, public location, and public contact links if visible.

Not allowed:

- Automatic login, connection requests, personal profile scraping, private data collection, or bypassing access restrictions.

### Instagram Public Profile

Allowed:

- Record public profile URL, account name, bio, public website link, and public contact details visible without login.

Not allowed:

- Automatic login, private messages, follower scraping, or restricted data access.

### TikTok Public Profile

Allowed:

- Record public profile URL, account name, bio, website link, and public business clues visible without login.

Not allowed:

- Automatic login, direct messages, follower scraping, or bypassing platform restrictions.

### YouTube Channel

Allowed:

- Record public channel URL, channel name, about text, public website/contact links, and video topics as activity signals.

### Vietnam Yellow Pages

Allowed:

- Extract public company name, category, address area, website, email, phone, products, and listing URL.
- Use as a priority source for Vietnam B2B leads.

### B2B Directories

Allowed:

- Extract public company profile, products, country/city, website, public contact info, and profile URL.
- Prefer directories with clear business identity and product categories.

## Output Rule

When reporting a lead, include `platform_source` and `source_url`. If a platform only provides a public account without contacts, record only the public account data and do not infer private contacts.
