require("dotenv").config();
const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const connectDB = require('./db');

const weatherRoutes = require('./routes/weather');
const airQualityRoutes = require('./routes/air-quality');
const historyRoutes = require('./routes/history');
const cityRoutes = require('./routes/cities');

// mongoDB connection
connectDB();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// OpenAPI (Swagger definition)
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Weather Application API",
      version: "1.0.0",
      description: "API documentation for Weather Application",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./routes/weather.js", "./routes/air-quality.js", "./routes/history.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/weather', weatherRoutes);
app.use('/air-quality', airQualityRoutes);
app.use('/history', historyRoutes);
app.use('/cities', cityRoutes);

//   try {
//     const { city, day } = req.query;
//     if (!day) {
//       day = 1;
//     }
//     // Check if the city is valid
//     if (!stateCapitals.cities.includes(city)) {
//       return res.status(400).json({ error: "Invalid city name" });
//     }

//     // Retrieve geolocation data using Open Meteo Geocoding API
//     const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
//     const geocodingResponse = await axios.get(geocodingUrl);
//     const geocodingData = geocodingResponse.data;

//     // Check if geolocation data is available
//     if (!geocodingData || geocodingData.length === 0) {
//       throw new Error("Failed to retrieve geolocation data");
//     }

//     // Extract latitude and longitude from the result
//     const { latitude, longitude } = geocodingData.results[0];

//     // Prepare the URL for weather data retrieval
//     const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&daily=sunrise,sunset&forecast_days=${day}&timezone=auto`;

//     // Retrieve weather data using Axios
//     const weatherResponse = await axios.get(weatherUrl);
//     const weatherData = weatherResponse.data;

//     // Save the lookup history in the database
//     await Lookup.create({ city });

//     // Send the weather data as the response
//     res.json(weatherData);
//   } catch (error) {
//     console.error("Error retrieving weather data", error);
//     if (error.response && error.response.status === 400) {
//       res.status(400).json({ error: "Invalid city name" });
//     } else {
//       res.status(500).json({ error: "Failed to retrieve weather data" });
//     }
//   }
// });





// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
