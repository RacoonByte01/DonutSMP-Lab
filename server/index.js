import { createServer } from "node:http";

const PORT = process.env.PORT || 3001;
const UPSTREAM = "https://api.donutstats.io";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "x-api-key, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders);
    return res.end();
  }

  if (!req.url.startsWith("/api/")) {
    res.writeHead(404, corsHeaders);
    return res.end("Not found");
  }

  if (req.method !== "GET") {
    res.writeHead(405, corsHeaders);
    return res.end("Method not allowed");
  }

  const apikey = req.headers["x-api-key"];

  try {
    const response = await fetch(
      UPSTREAM + req.url.replace(/^\/api/, ""),
      apikey ? { headers: { "x-api-key": apikey } } : {},
    );
    const body = await response.text();
    res.writeHead(response.status, {
      ...corsHeaders,
      "content-type": response.headers.get("content-type") || "application/json",
    });
    res.end(body);
  } catch (error) {
    console.error(error);
    res.writeHead(502, corsHeaders);
    res.end("Upstream error");
  }
}).listen(PORT, () => {
  console.log(`DonutStats proxy on http://localhost:${PORT}`);
});
