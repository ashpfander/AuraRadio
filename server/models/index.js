// Import all models
const User = require('./user');
const Mood = require('./mood');
const Playlist = require('./playlist');
const yourPlaylist = require('./yourplaylist')

// Export all models
module.exports = {
  User,
  Mood,
  Playlist,
  yourPlaylist
};
