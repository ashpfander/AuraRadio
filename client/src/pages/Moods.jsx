// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const moods = [
//   { id: '1', title: "Happy", description: "Feel good vibes" },
//   { id: '2', title: "Sad", description: "Melancholic tunes" },
//   { id: '3', title: "Energized", description: "Power up with high-energy beats and uplifting rhythms." },
//   { id: '4', title: "Nostalgic", description: "Revisit the classics that take you back in time." },
//   { id: '5', title: "Rock", description: "Unleash the guitars with the best of rock." },
//   { id: '6', title: "Metal", description: "Dive into the intense world of heavy metal." },
//   { id: '7', title: "Grunge", description: "Get raw and grungy with iconic tracks from the underground." },
//   { id: '8', title: "Pop", description: "Catchy hooks and melodies that stay with you." }
// ];

// function Moods() {
//   const navigate = useNavigate();

//   const handleMoodClick = (moodId) => {
//     navigate(`/${moodId}/playlists`);
//   };

//   return (
//     <div className="Moods text-center p-5">
//       <h2>Select a Playlist for your mood!</h2>
//       <div className="list-group">
//         {moods.map(mood => (
//           <button
//             key={mood.id}
//             className="list-group-item list-group-item-action"
//             onClick={() => handleMoodClick(mood.id)}
//           >
//             {mood.title}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Moods;

import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_MOODS } from '../utils/queries';

function Moods() {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_MOODS);

  const handleMoodClick = (moodId) => {
    navigate(`/${moodId}/playlists`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="Moods text-center p-5">
      <h2>Select a Playlist for your mood!</h2>
      <div className="list-group">
        {data.getMoods.map(mood => (
          <button
            key={mood.id}
            className="list-group-item list-group-item-action"
            onClick={() => handleMoodClick(mood.id)}
          >
            {mood.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Moods;


