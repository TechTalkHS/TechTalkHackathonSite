exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body:'Method Not Allowed'};
  }

  const data = JSON.parse(event.body);

  const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application.js' },
    body: JSON.stringify({
      content: 'New submission from "${data.name}" in team "${data.team_name}" with "${data.members}: ${data.email}, ${data.can_come}'
    })
  });

  if (!response.ok) {
    return { statusCode: 500, body: 'Failed to send to Discord'};
  }

  return { statusCode: 200, body: 'Sent!'};
}
