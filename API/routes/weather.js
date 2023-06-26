const express = require("express");
const axios = require("axios");
const stateCapitals = require("../stateCapitals.json");
const Lookup = require("../models/Lookup");

const router = express.Router();

/**
 * @openapi
 * /weather:
 *   get:
 *     summary: Get real-time weather data for a city.
 *     description: Retrieve real-time weather data for a specific city.
 *     tags:
 *       - Weather
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the city.
 *     responses:
 *       '200':
 *         description: Successful response with weather data.
 *       '500':
 *         description: Failed to retrieve weather data.
 */
router.get("/", async (req, res) => {
  try {
    let { city, day } = req.query;
    if (!day) {
      day = 1;
    }
    // Check if the city is valid
    if (!stateCapitals.cities.includes(city)) {
      return res.status(400).json({ error: "Invalid city name" });
    }

    // Retrieve geolocation data using Open Meteo Geocoding API
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
    const geocodingResponse = await axios.get(geocodingUrl);
    const geocodingData = geocodingResponse.data;

    // Check if geolocation data is available
    if (!geocodingData || geocodingData.length === 0) {
      throw new Error("Failed to retrieve geolocation data");
    }

    // Extract latitude and longitude from the result
    const { latitude, longitude } = geocodingData.results[0];

    // Prepare the URL for weather data retrieval
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&daily=sunrise,sunset&forecast_days=${day}&timezone=auto`;

    // Retrieve weather data using Axios
    const weatherResponse = await axios.get(weatherUrl);
    const weatherData = weatherResponse.data;

    const lastLookup = await Lookup.findOne({ city }).sort({ timestamp: -1 });

    if (lastLookup && lastLookup.city === city) {
      return res.json(weatherData);
    }

    await Lookup.create({ city });

    // Send the weather data as the response
    res.json(weatherData);
  } catch (error) {
    console.error("Error retrieving weather data", error);
    if (error.response && error.response.status === 400) {
      res.status(400).json({ error: "Invalid city name" });
    } else {
      res.status(500).json({ error: "Failed to retrieve weather data" });
    }
  }
});

module.exports = router;
