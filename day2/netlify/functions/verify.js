// day2/netlify/functions/verify.js
// HarvestBridge · Bot 2 · PATHLOCK unlock validation

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { code } = JSON.parse(event.body || '{}');
    const expected = process.env.UNLOCK_CODE || '';
    const valid = code && code.trim().toUpperCase() === expected.trim().toUpperCase();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valid }),
    };
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ valid: false, error: 'Invalid request' }),
    };
  }
};
