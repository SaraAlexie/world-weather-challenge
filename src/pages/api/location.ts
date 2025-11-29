import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { q, limit = "5" } = req.query;

    const API_KEY = process.env.OPEN_WEATHER_KEY;

    if (!API_KEY) {
        return res.status(500).json({ error: "API key is missing" });
    }

    if (!q) {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        q as string
    )}&limit=${limit}&appid=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data.message });
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
