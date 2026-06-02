// HarvestBridge · Day 3 · health.js
// Simple health check for pre-session verification

exports.handler = async () => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({
      status: 'ok',
      day: 3,
      mode: 'synthesis-decision',
      unlock: 'none',
      timestamp: new Date().toISOString()
    })
  };
};
