import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

export const CREATE_MOOD = gql`
  mutation CreateMood($name: String!) {
    createMood(name: $name) {
      id
      name
    }
  }
`;

export const CREATE_PLAYLIST = gql`
  mutation CreatePlaylist($title: String!, $iframeUrl: String!, $description: String!, $userId: ID!, $moodId: ID!) {
    createPlaylist(title: $title, iframeUrl: $iframeUrl, description: $description, userId: $userId, moodId: $moodId) {
      id
      title
      iframeUrl
      description
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

