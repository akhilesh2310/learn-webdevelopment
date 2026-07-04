Before making changes, read:

- PROJECT_REQUIREMENTS.md
- AI_PROJECT_CONTEXT.md
- KNOWLEDGE_ARCHITECTURE.md
- DECISIONS.md
- .knowledge/knowledge-rules.yaml
- .knowledge/knowledge-map.yaml
- .github/copilot-instructions.md

Task:

Review the documentation page or section named by the user.

Rules:

- Do not rewrite content during the review.
- Do not move or delete files during the review.
- Search for duplicate or overlapping topics.
- Check whether the page is the canonical home for its topic.
- Check links, headings, sidebar placement, TODO markers, and Docusaurus compatibility.
- Add uncertain findings to `.knowledge/review-queue.yaml` only if the user asks to record them.

Report:

- Issues found
- Duplicate or overlapping pages
- Missing cross-links
- Suggested canonical location
- Docusaurus/build risks
- Recommended next action
