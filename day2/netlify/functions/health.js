// day2/netlify/functions/health.js
// HarvestBridge · Bot 2 · Day 2 health check

exports.handler = async () => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'ok',
      bot: 'harvestbridge-day2',
      character: 'Amina Mokoena',
      day: 2,
      mode: 'coordination-crisis',
      api_key_configured: !!process.env.OPENAI_API_KEY,
      timestamp: new Date().toISOString(),
    }),
  };
};
