import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const moods = [
  { id: '1', title: "Happy", description: "Feel good vibes" },
  { id: '2', title: "Sad", description: "Melancholic tunes" },
  { id: '3', title: "Energized", description: "Power up with high-energy beats and uplifting rhythms." },
  { id: '4', title: "Nostalgic", description: "Revisit the classics that take you back in time." },
  { id: '5', title: "Rock", description: "Unleash the guitars with the best of rock." },
  { id: '6', title: "Metal", description: "Dive into the intense world of heavy metal." },
  { id: '7', title: "Grunge", description: "Get raw and grungy with iconic tracks from the underground." },
  { id: '8', title: "Pop", description: "Catchy hooks and melodies that stay with you." }
];

function Moods() {
  const navigate = useNavigate();

  // const randomBackgroundColor = () => {
  //   const [color, setColor] = useState("");

  //   const generateColor = () => {
  //     var random1 = Math.floor(Math.random() * 256);
  //     var random2 = Math.floor(Math.random() * 256);
  //     var random3 = Math.floor(Math.random() * 256);
  //     var bgColor = `rgb(${random1}, ${random2}, ${random3})`;
  //     setColor(bgColor);
  //   };

  //   generateColor();

  //   return color;
  // };

  const handleMoodClick = (moodId) => {
    navigate(`/${moodId}/playlists`);
  };

  return (
    <div className="container-fluid text-center p-5">
      <h2 className="mb-3">Select a Playlist for your mood!</h2>
      <div className="row">
        {moods.map(mood => (
          <div className="list-group col-6 mb-3">
          <button
            key={mood.id}
            className="moods list-group-item list-group-item-action pt-4 pb-3"
            style={{ backgroundColor: "blue" }}
            onClick={() => handleMoodClick(mood.id)}
          >
            <h3>{mood.title}</h3>
            <p>{mood.description}</p>
          </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Moods;
