const express = require('express');
const stateCapitals = require('../stateCapitals.json');

const router = express.Router();

router.get("/", (req, res) => {
    try {
      const cities = stateCapitals.cities;
      res.json(cities);
    } catch (error) {
      console.error("Error retrieving city names", error);
      res.status(500).json({ error: "Failed to retrieve city names" });
    }
});

module.exports = router;
