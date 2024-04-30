import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { CREATE_PLAYLIST } from '../utils/mutations';

function Playlists() {
  const [iframeInput, setIframeInput] = useState('');
  const [createPlaylist, { data, loading, error }] = useMutation(CREATE_PLAYLIST);
  const { moodId } = useParams(); 

  const handleIframeInput = (event) => {
    setIframeInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const urlMatch = iframeInput.match(/src="([^"]+)"/);
    if (urlMatch) {
      try {
        const iframeUrl = urlMatch[1];
        await createPlaylist({
          variables: {
            title: "New Playlist",
            iframeUrl,
            description: "User submitted playlist",
            userId: "YourUserIdHere", 
            moodId
          }
        });
        setIframeInput(''); // Reset the input after successful submission
      } catch (error) {
        console.error('Error submitting the playlist:', error);
      }
    } else {
      alert('Invalid iframe input. Please check your input and try again.');
    }
  };

  return (
    <div>
      <h2>Add a Playlist</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={iframeInput}
          onChange={handleIframeInput}
          placeholder="Paste the SoundCloud iframe here"
          style={{ width: '100%', height: '100px' }}
        />
        <button type="submit" disabled={loading}>
          Submit Playlist
        </button>
        {loading && <p>Submitting...</p>}
        {error && <p>Error submitting playlist: {error.message}</p>}
      </form>
      <div>
        {/* Additional code to display playlists if needed */}
      </div>
    </div>
  );
}

export default Playlists;

