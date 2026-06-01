// day1/netlify/functions/health.js
// HarvestBridge · Bot 1 health check endpoint

exports.handler = async function (event, context) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  const hasApiKey = !!process.env.OPENAI_API_KEY;

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      status: "ok",
      bot: "harvestbridge-day1",
      character: "Amina Mokoena",
      stages: ["1-orientation", "2-scaletrap"],
      api_key_configured: hasApiKey,
      timestamp: new Date().toISOString(),
    }),
  };
};
