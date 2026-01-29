---
name: create-post
description: Create a new blog post for the kimmoihanus.com site. Use when the user wants to write, create, or draft a new blog post or article.
---

# Create Blog Post

This skill helps create new blog posts for the kimmoihanus.com Next.js site.

## When to Use

- User wants to create a new blog post
- User wants to write an article
- User mentions "new post", "blog post", "write article"

## Related Skills

For AI Search optimized content, also use the `geo-content` skill which provides:

- GEO (Generative Engine Optimization) best practices
- Article structure blueprints for AI visibility
- Data citation strategies
- Pre-publish checklists

## Blog Post Structure

Posts are stored in `/posts/` directory with the naming convention:
`XXX-slug-with-dashes.md`

Where XXX is a zero-padded number (001, 002, etc.)

## Frontmatter Format

Every post must include this YAML frontmatter:

```yaml
---
title: 'Your Post Title Here'
date: YYYY-MM-DD
---

```

## Instructions

1. Check existing posts to determine the next number:

   ```bash
   ls -la posts/
   ```

2. Create the new post file with proper naming:

   - Increment from the highest existing number
   - Use lowercase slugs with dashes
   - Example: `011-your-post-title.md`

3. Include required frontmatter with today's date

4. Write content using markdown with:
   - H2 headings for main sections (`##`)
   - Code blocks with language hints
   - Images from `/public/blog/images/`
   - Links in markdown format

## Post Content Guidelines

- Start with a compelling introduction (no H1 - title comes from frontmatter)
- Use H2 (`##`) for main sections
- Include code examples when relevant
- End with a conclusion or call-to-action

## Example Post

```markdown
---
title: 'My New Post Title'
date: 2026-01-29
---

## Introduction paragraph

Your opening content here...

## Main Section

Content with **bold** and _italic_ text.

### Subsection

More detailed content.

## Conclusion

Wrap up your thoughts.
```

## Script Usage

Run the helper script to create a new post scaffold:

```bash
./scripts/create-post.sh "Your Post Title"
```
