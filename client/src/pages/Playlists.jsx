import React from 'react';
import { useParams } from 'react-router-dom';

function Playlists() {
  const { moodId } = useParams(); // Get moodId from the URL parameter

  const getPlaylistUrl = (moodId) => {
    return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${moodId}`;
  };

  return (
    <div>
      <iframe
        width="100%"
        height="300"
        scrolling="no"
        frameborder="no"
        allow="autoplay"
        src={getPlaylistUrl(moodId)}
        style={{ border: "none", overflow: "hidden" }}
      ></iframe>
    </div>
  );
}

export default Playlists;
