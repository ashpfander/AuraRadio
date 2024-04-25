const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String
});

module.exports = mongoose.model('Mood', moodSchema);