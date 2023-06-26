const express = require('express');
const Lookup = require('../models/Lookup');

const router = express.Router();

/**
 * @openapi
 * /history:
 *   get:
 *     summary: Get lookup history.
 *     description: Retrieve the lookup history of cities.
 *     tags:
 *       - Weather
 *     responses:
 *       '200':
 *         description: Successful response with lookup history.
 *       '500':
 *         description: Failed to retrieve lookup history.
 */
router.get("/", async (req, res) => {
    try {
      const history = await Lookup.find().sort({ timestamp: -1 }).exec();
      res.json(history);
    } catch (error) {
      console.error("Error retrieving lookup history", error);
      res.status(500).json({ error: "Failed to retrieve lookup history" });
    }
  });

module.exports = router;
