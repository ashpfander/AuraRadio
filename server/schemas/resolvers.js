const { User, Mood, Playlist, yourPlaylist } = require('../models');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const ObjectId = mongoose.Types.ObjectId;

// Define custom ObjectId scalar
const objectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'MongoDB ObjectId scalar type',
  serialize(value) {
    if (value instanceof mongoose.Types.ObjectId) {
      return value.toHexString();  // Convert ObjectId to string
    }
    return value;
  },
  parseValue(value) {
    return new mongoose.Types.ObjectId(value);  // Convert string to ObjectId
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new mongoose.Types.ObjectId(ast.value);  // Convert string to ObjectId
    }
    return null;
  }
});

const resolvers = {
  ObjectId: objectIdScalar,
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
      if (!ObjectId.isValid(moodId)) {
        throw new Error(`Invalid ID format: ${moodId}`);
      }
      try {
        const playlists = await Playlist.find({ mood: new ObjectId(moodId) }).populate('user');
        return playlists.map(playlist => ({
          ...playlist.toObject(),
          user: {
            ...playlist.user.toObject(),
            id: playlist.user._id.toString()  // Ensure the user ID is converted to a string
          }
        }));
      } catch (error) {
        console.error("Failed to fetch playlists by mood:", error);
        throw new Error("Error loading the playlists: " + error.message);
      }
    }
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const newUser = new User({ username, email, password });
      await newUser.save();
      return newUser;
    },
    createMood: async (_, { name, description }) => {
      const newMood = new Mood({ name, description });
      await newMood.save();
      return newMood;
    },

   // createyourPlaylist: async (_, { name, description }) => {
   //   const newyourPlaylist = new yourPlaylist({ name, description });
   //   await newyourPlaylist.save();
   //   return newyourPlaylist;
  //  },


    createPlaylist: async (_, { title, iframeContent, description, userId, moodId }) => {
      console.log("Received mutation data:", { title, iframeContent, description, userId, moodId });
    
      if (!ObjectId.isValid(userId) || !ObjectId.isValid(moodId)) {
        throw new Error("Invalid user or mood ID format");
      }
    
      try {
        const newPlaylist = new Playlist({
          title,
          iframeContent,
          description,
          user: new ObjectId(userId), 
          mood: new ObjectId(moodId)  
        });
        
        await newPlaylist.save();
        console.log("Playlist created successfully:", newPlaylist);
        return newPlaylist;
      } catch (error) {
        console.error("Failed to create playlist:", error);
        throw new Error("Failed to save the playlist to the database. Please try again.");
      }
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


