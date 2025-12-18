import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lat, lon, unit = "metric" } = req.query;

  const API_KEY = process.env.OPEN_WEATHER_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key is missing" });
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message });
    }

    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
