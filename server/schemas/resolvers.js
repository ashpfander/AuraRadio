const { User, Mood, Playlist } = require('../models');
const { signToken } = require('../utils/auth');

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
      const newUser = new User({ username, email, password });
      await newUser.save();
      return newUser;
    },
    createMood: async (_, { name }) => {
      const newMood = new Mood({ name });
      await newMood.save();
      return newMood;
    },
    createPlaylist: async (_, { title, iframeUrl, description, userId, moodId }) => {
      const newPlaylist = new Playlist({ title, iframeUrl, description, user: userId, mood: moodId });
      await newPlaylist.save();
      return newPlaylist;
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !await user.isCorrectPassword(password)) {
        throw new Error('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    signup: async (_, { username, email, password }) => {
      const user = new User({ username, email, password });
      await user.save();
      const token = signToken(user);
      return { token, user };
    }
  }
};

module.exports = resolvers;

