export default async function handler(req, res) {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  // Extract parameters from query
  const { number } = req.query;
  
  // Key can come from multiple sources - check all
  const key = req.query.key || req.query.slug || null;

  // Validate number parameter
  if (!number) {
    return res.status(400).json({
      status: "error",
      message: "number parameter required",
      developer: "Aditya",
      youtube: "https://youtube.com/@YourChannelHere"
    });
  }

  // Validate key parameter
  if (!key) {
    return res.status(401).json({
      status: "error",
      message: "key required",
      developer: "Aditya",
      youtube: "https://youtube.com/@YourChannelHere"
    });
  }

  // Key format validation - accepts ADITYA- prefix with any suffix
  if (!key.startsWith('ADITYA-')) {
    return res.status(401).json({
      status: "error",
      message: "invalid key format",
      developer: "Aditya"
    });
  }

  // Additional key validation - check minimum length
  if (key.length < 10) {
    return res.status(401).json({
      status: "error",
      message: "key too short",
      developer: "Aditya"
    });
  }

  try {
    // Fetch data from upstream API
    const upstream = await fetch(
      `https://numberinfo-api-adibhai.vercel.app/api/number?number=${encodeURIComponent(number)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!upstream.ok) {
      return res.status(502).json({
        status: "error",
        message: "upstream service unavailable",
        developer: "Aditya"
      });
    }

    const data = await upstream.json();

    // Return formatted response
    return res.status(200).json({
      status: data.status || "success",
      number: data.number || number,
      data: data.data || null,
      key: key,
      developer: "Aditya",
      youtube: "https://youtube.com/@YourChannelHere"
    });
  } catch (err) {
    // Handle fetch errors
    return res.status(500).json({
      status: "error",
      message: "upstream fetch failed",
      error: err.message,
      developer: "Aditya",
      youtube: "https://youtube.com/@YourChannelHere"
    });
  }
}
