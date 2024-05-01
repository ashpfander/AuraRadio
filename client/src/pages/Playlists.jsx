import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PLAYLIST } from '../utils/mutations';
import { GET_PLAYLISTS_BY_MOOD } from '../utils/queries';
import AuthService from '../utils/auth';

function Playlists() {
  const [title, setTitle] = useState('');
  const [iframeInput, setIframeInput] = useState('');
  const [description, setDescription] = useState('');
  const { moodId } = useParams();
  const userId = AuthService.getUserId();  

  const [createPlaylist, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_PLAYLIST, {
    onCompleted: data => {
      console.log('Playlist created successfully:', data);
      setIframeInput(''); // Clear the input field after submission
      setTitle('');
      setDescription('');
    },
    onError: (error) => {
      console.error('Error submitting the playlist:', error);
      if (error.graphQLErrors) console.error('GraphQL Errors:', error.graphQLErrors);
      if (error.networkError) console.error('Network Error:', error.networkError);
    }
  });

  const { loading: queryLoading, error: queryError, data } = useQuery(GET_PLAYLISTS_BY_MOOD, {
    variables: { moodId }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Ensure user is logged in and get user ID
    if (!userId) {
      console.error("User ID is undefined. User must be logged in to submit a playlist.");
      return; 
    }
  
    console.log("Submitting with data:", { title, iframeContent: iframeInput, description, userId, moodId });
  
    try {
      const response = await createPlaylist({
        variables: {
          title, 
          iframeContent: iframeInput,
          description, 
          userId, 
          moodId
        }
      });
      console.log('Playlist created successfully:', response.data);
      setIframeInput(''); // Clear the input field after submission
    } catch (error) {
      console.error('Error submitting the playlist:', error);
      if (error.graphQLErrors) console.error('GraphQL Errors:', error.graphQLErrors);
      if (error.networkError) console.error('Network Error:', error.networkError);
    }
  };

  if (queryLoading) return <p>Loading playlists...</p>;
  if (queryError) return <p>Error loading playlists: {queryError.message}</p>;

  return (
    <div>
      <h2>Add a Playlist</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title of the playlist"
          required
        />
        <textarea
          value={iframeInput}
          onChange={(e) => setIframeInput(e.target.value)}
          placeholder="Paste the SoundCloud iframe here"
          required
          style={{ width: '100%', height: '100px' }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the playlist"
          required
          style={{ width: '100%', height: '50px' }}
        />
        <button type="submit" disabled={mutationLoading}>
          Submit Playlist
        </button>
        {mutationLoading && <p>Submitting...</p>}
        {mutationError && <p>Error submitting playlist: {mutationError.message}</p>}
      </form>
      <div>
        <h3>Existing Playlists</h3>
        {data && data.getPlaylistsByMood.map((playlist, index) => (
          <div key={index}>
            <p>{playlist.title}</p>
            <div dangerouslySetInnerHTML={{ __html: playlist.iframeContent }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlists;



