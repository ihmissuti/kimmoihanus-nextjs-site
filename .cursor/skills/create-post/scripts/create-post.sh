#!/bin/bash

# Create a new blog post scaffold
# Usage: ./create-post.sh "Your Post Title"

if [ -z "$1" ]; then
    echo "Usage: ./create-post.sh \"Your Post Title\""
    exit 1
fi

TITLE="$1"
DATE=$(date +%Y-%m-%d)
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g')

# Find the next post number
LAST_NUM=$(ls -1 posts/ 2>/dev/null | grep -E '^[0-9]{3}-' | sort -r | head -1 | cut -c1-3)
if [ -z "$LAST_NUM" ]; then
    NEXT_NUM="001"
else
    NEXT_NUM=$(printf "%03d" $((10#$LAST_NUM + 1)))
fi

FILENAME="posts/${NEXT_NUM}-${SLUG}.md"

# Create the post file
cat > "$FILENAME" << EOF
---
title: '${TITLE}'
date: ${DATE}
---

## Introduction

Your opening content here...

## Main Section

Content for your main section.

## Conclusion

Wrap up your thoughts.
EOF

echo "Created: $FILENAME"
