const mongoose = require('mongoose');

const lookupSchema = new mongoose.Schema({
  city: String,
  timestamp: { type: Date, default: Date.now }
});

const Lookup = mongoose.model('Lookup', lookupSchema);

module.exports = Lookup;
