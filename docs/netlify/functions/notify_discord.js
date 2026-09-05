exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const requiredFields = ['name', 'team_name', 'members', 'email', 'can_come'];
    if (
      requiredFields.some(
        (field) => typeof data[field] !== 'string' || data[field].trim() === ''
      )
    ) {
      return { statusCode: 400, body: 'Missing registration fields' };
    }

    if (!process.env.DISCORD_WEBHOOK_URL) {
      console.error('DISCORD_WEBHOOK_URL is not configured');
      return { statusCode: 500, body: 'Discord notifications are not configured' };
    }

    const canComeText = data.can_come === 'y' ? 'Yes' : 'No';

    const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [
          {
            title: 'New Registration',
            color: 5814783,
            fields: [
              { name: 'Name', value: data.name, inline: true },
              { name: 'Team Name', value: data.team_name, inline: true },
              { name: 'Members', value: data.members },
              { name: 'Email', value: data.email },
              { name: 'Attending in person?', value: canComeText }
            ],
            timestamp: new Date().toISOString()
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Discord error:', response.status, errorText);
      return { statusCode: 500, body: 'Failed to send to Discord' };
    }

    return { statusCode: 200, body: 'Sent!' };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 400, body: 'Invalid request body' };
  }
};
