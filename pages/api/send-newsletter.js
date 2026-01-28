// API endpoint to send newsletter to all subscribers
// Call this manually or create an admin UI to trigger it

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Simple API key protection - set your own secret
  const { apiKey, subject, html, text } = req.body;

  if (apiKey !== process.env.NEWSLETTER_API_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!subject || (!html && !text)) {
    return res.status(400).json({ error: 'Subject and content (html or text) are required' });
  }

  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL || 'newsletter@yourdomain.com';

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID || !RESEND_API_KEY) {
    return res.status(500).json({ error: 'Missing configuration' });
  }

  try {
    // Fetch all active subscribers from Notion
    let subscribers = [];
    let hasMore = true;
    let startCursor = undefined;

    while (hasMore) {
      const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          filter: {
            property: 'Status',
            select: { equals: 'Active' },
          },
          start_cursor: startCursor,
        }),
      });

      const data = await response.json();

      const emails = data.results.map((page) => page.properties.Email?.email).filter(Boolean);

      subscribers = [...subscribers, ...emails];
      hasMore = data.has_more;
      startCursor = data.next_cursor;
    }

    if (subscribers.length === 0) {
      return res.status(200).json({ message: 'No active subscribers found', sent: 0 });
    }

    // Send email via Resend (batch sending)
    const response = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        subscribers.map((email) => ({
          from: FROM_EMAIL,
          to: email,
          subject,
          html,
          text,
        }))
      ),
    });

    if (response.ok) {
      const result = await response.json();
      return res.status(200).json({
        message: 'Newsletter sent successfully',
        sent: subscribers.length,
        data: result,
      });
    }

    const errorData = await response.json();
    console.error('Resend API error:', errorData);
    return res.status(500).json({ error: 'Failed to send newsletter', details: errorData });
  } catch (error) {
    console.error('Send newsletter error:', error);
    return res.status(500).json({ error: 'Failed to send newsletter' });
  }
}
