---
name: excel-lead-export
description: Use this skill when preparing, formatting, validating, or exporting B2B lead data to Excel or spreadsheet-compatible tables.
---

# Excel Lead Export

Use this skill to format B2B lead data for Excel export.

## Compliance Baseline

- Export only public company or merchant information.
- Every exported lead must include at least one `source_url` or equivalent `数据来源链接`.
- Do not automatically send emails.
- Do not automatically send private messages.
- Do not automatically add friends, follow accounts, or send connection requests.
- Do not bypass platform restrictions, access controls, paywalls, rate limits, robots controls, or anti-bot systems.
- Do not collect or export private sensitive information.
- Do not export fabricated or sourceless leads.

## Required Columns

Export columns in this order:

1. 优先级
2. 评分
3. 公司名
4. 国家
5. 城市
6. 客户类型
7. 平台来源
8. 账号名
9. 账号链接
10. 官网
11. 邮箱
12. 电话
13. WhatsApp
14. Zalo
15. Facebook
16. LinkedIn
17. Instagram
18. TikTok
19. YouTube
20. 主营产品
21. 推荐开发产品
22. 评分原因
23. 数据来源链接
24. 跟进状态
25. 业务员备注

## Field Rules

- `数据来源链接` is required for every row.
- `source_url` must be preserved when converting raw lead data into the export table.
- Do not export rows without a source URL.
- Leave unknown fields blank; do not guess.
- Keep one company per row unless the user explicitly asks to split by branch or account.
- Use stable text values for priority: `A级`, `B级`, `C级`.
- Use numeric values for score.
- Use `未跟进` as the default follow-up status unless the user provides another status.
- Keep notes concise and business-focused.

## Validation Before Export

Before creating an Excel file or spreadsheet table:

1. Remove duplicate companies when the same source or website appears more than once.
2. Confirm every row has company name and source URL.
3. Confirm score and priority are consistent.
4. Confirm contact fields contain only public contact data.
5. Confirm social fields are public account or page URLs, not private profiles unless the user specifically requested public personal decision-maker research and it is compliant.

## Output

When exporting, produce either:

- An `.xlsx` file using the required columns, or
- A spreadsheet-ready table in the required column order.

If creating an `.xlsx`, freeze the header row when practical and keep column names exactly as listed.
