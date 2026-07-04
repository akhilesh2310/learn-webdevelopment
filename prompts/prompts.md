Before making any changes, read AI_PROJECT_CONTEXT.md and PROJECT_REQUIREMENTS.md, then follow them strictly.

To add new contet:
Process this using prompts/add-new-knowledge.md


For images: 
Before migrating documentation, inspect all files inside source-notes.

Task:
1. Scan all Markdown files.
2. Detect embedded Base64 images.
3. Count them.
4. Report:
   - filename
   - approximate image size
   - nearest heading where the image appears
5. Do NOT modify any files.
6. Do NOT migrate images yet.
7. Recommend an extraction strategy for Docusaurus using the static/img directory.
8. Estimate how many image files would be created.


Read KNOWLEDGE_ARCHITECTURE.md and follow the defined knowledge hierarchy.

Read:

- PROJECT_REQUIREMENTS.md
- AI_PROJECT_CONTEXT.md
- KNOWLEDGE_ARCHITECTURE.md
- WORKFLOWS.md
- .knowledge/*

Then process the new content according to the project rules.