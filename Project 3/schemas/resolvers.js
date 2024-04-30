const { User, Mood, Playlist } = require('../../Project 3/models');

const resolvers = {
  Query: {
    getUsers: async () => {
      return User.find({});
    },
    getMoods: async () => {
      return Mood.find({});
    },
    getPlaylists: async () => {
      return Playlist.find({});
    },
    getPlaylistsByMood: async (_, { moodId }) => {
      return Playlist.find({ mood: moodId });
    }
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      // Add password encryption before saving the user
      const newUser = new User({ username, email, password });
      return newUser.save();
    },
    createMood: async (_, { name }) => {
      const newMood = new Mood({ name });
      return newMood.save();
    },
    createPlaylist: async (_, { title, iframeUrl, description, userId, moodId }) => {
      const newPlaylist = new Playlist({ title, iframeUrl, description, user: userId, mood: moodId });
      return newPlaylist.save();
    }
  }
};

module.exports = resolvers;
