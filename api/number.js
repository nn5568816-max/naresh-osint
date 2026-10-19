export default async function handler(req, res) {
  // CORS preflight handling
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  // Only allow GET method
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: "error",
      message: "Method not allowed"
    });
  }

  // Get query parameters
  const { number, key, slug } = req.query;
  const apiKey = key  slug  null;

  // Validate number parameter
  if (!number) {
    return res.status(400).json({
      status: "error",
      message: "number parameter required",
      developer: "Aditya"
    });
  }

  // Validate API key
  if (!apiKey) {
    return res.status(401).json({
      status: "error",
      message: "key required",
      developer: "Aditya"
    });
  }

  // Validate key format
  if (!apiKey.startsWith('ADITYA-')) {
    return res.status(401).json({
      status: "error",
      message: "invalid key",
      developer: "Aditya"
    });
  }

  try {
    // Fetch from upstream API
    const response = await fetch(
      https://numberinfo-api-adibhai.vercel.app/api/number?number=${encodeURIComponent(number)},
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Upstream API error');
    }

    const data = await response.json();

    // Return success response
    return res.status(200).json({
      status: data.status || "success",
      number: data.number || number,
      data: data.data || null,
      developer: "Aditya",
      youtube: "https://youtube.com/@AdityaOfficial"
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      status: "error",
      message: "upstream fetch failed",
      developer: "Aditya",
      youtube: "https://youtube.com/@AdityaOfficial"
    });
  }
}
