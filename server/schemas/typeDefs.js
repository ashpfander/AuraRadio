const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mood {
    id: ID!
    name: String!
    playlists: [Playlist]
  }

  type Playlist {
    id: ID!
    title: String!
    iframeContent: String!
    description: String!
    user: User!
    mood: Mood!
  }

  type Query {
    getUsers: [User]
    getMoods: [Mood]
    getPlaylists: [Playlist]
    getPlaylistsByMood(moodId: ID!): [Playlist]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    createMood(name: String!): Mood
    createPlaylist(title: String!, iframeUrl: String!, description: String!, userId: ID!, moodId: ID!): Playlist
    login(email: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;