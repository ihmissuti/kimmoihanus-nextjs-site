export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.error('Notion credentials not configured');
    return res.status(500).json({ error: 'Newsletter service is not configured' });
  }

  try {
    // Check if email already exists in Notion
    const searchResponse = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        filter: {
          property: 'Email',
          email: { equals: email },
        },
      }),
    });

    const searchData = await searchResponse.json();

    if (searchData.results && searchData.results.length > 0) {
      return res.status(400).json({ error: 'You are already subscribed!' });
    }

    // Add new subscriber to Notion
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          Email: { email: email },
          'Subscribed At': { date: { start: new Date().toISOString() } },
          Status: { select: { name: 'Active' } },
        },
      }),
    });

    if (response.ok) {
      return res.status(201).json({ message: 'Subscription successful' });
    }

    const errorData = await response.json();
    console.error('Notion API error:', errorData);
    return res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
  }
}
