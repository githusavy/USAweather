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

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
