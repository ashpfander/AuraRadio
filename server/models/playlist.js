const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  iframeUrl: { type: String, required: true }, // URL to the SoundCloud playlist
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mood: { type: mongoose.Schema.Types.ObjectId, ref: 'Mood' }
});

module.exports = mongoose.model('Playlist', playlistSchema);