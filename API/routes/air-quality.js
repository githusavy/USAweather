const express = require('express');
const axios = require('axios');
const stateCapitals = require('../stateCapitals.json');
const Lookup = require('../models/Lookup');

const router = express.Router();

/**
 * @openapi
 * /air-quality:
 *   get:
 *     summary: Get air quality data for a city.
 *     description: Retrieve air quality data for a specific city.
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
 *         description: Successful response with air quality data.
 *       '400':
 *         description: Invalid city name.
 *       '500':
 *         description: Failed to retrieve air quality data.
 */
router.get("/", async (req, res) => {
    try {
      const { city } = req.query;
  
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
  
      // Prepare the URL for air quality data retrieval
      const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=carbon_monoxide,dust,us_aqi`;
  
      // Retrieve air quality data using Axios
      const response = await axios.get(url);
      const airQualityData = response.data;
  
      // Save the lookup history in the database
      await Lookup.create({ city });
  
      // Send the air quality data as the response
      res.json(airQualityData);
    } catch (error) {
      console.error("Error retrieving air quality data", error);
      if (error.response && error.response.status === 400) {
        res.status(400).json({ error: "Invalid city name" });
      } else {
        res.status(500).json({ error: "Failed to retrieve air quality data" });
      }
    }
  });
  
  module.exports = router;

