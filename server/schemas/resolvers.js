const { User, Mood, Playlist } = require('../models');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
      console.log("Received moodId:", moodId);
      try {
        if (!ObjectId.isValid(moodId)) {
          throw new Error(`Invalid ID format: ${moodId}`);
        }
        return await Playlist.find({ mood: new ObjectId(moodId) });
      } catch (err) {
        console.error("Error loading the playlists:", err.message);
      }
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
    createPlaylist: async (_, { title, iframeContent, description, userId, moodId }) => {
      console.log("Received mutation data:", { title, iframeContent, description, userId, moodId });
      if (!ObjectId.isValid(userId) || !ObjectId.isValid(moodId)) {
        throw new Error("Invalid user or mood ID format");
      }
      const newPlaylist = new Playlist({
        title, 
        iframeContent, 
        description,
        user: ObjectId(userId),
        mood: ObjectId(moodId)
      });
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

