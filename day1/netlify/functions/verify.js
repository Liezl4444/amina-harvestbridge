// day1/netlify/functions/verify.js
// HarvestBridge · Bot 1 · Stage 2 unlock verification
// Validates SCALETRAP keyword against UNLOCK_CODE environment variable
// Never expose the unlock code in client-side code

exports.handler = async function (event, context) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const { code } = JSON.parse(event.body);

    if (!code || typeof code !== "string") {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ valid: false }),
      };
    }

    const expectedCode = process.env.UNLOCK_CODE;

    if (!expectedCode) {
      console.error("UNLOCK_CODE environment variable not set");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ valid: false, error: "Configuration error" }),
      };
    }

    const valid = code.trim().toUpperCase() === expectedCode.trim().toUpperCase();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ valid }),
    };
  } catch (error) {
    console.error("Verify function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ valid: false }),
    };
  }
};
