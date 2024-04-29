

const moods = [
  {
    title: "Happy",
    description: "."
  },
  {
    title: "Sad",
    description: "."
  },
  {
    title: "Energized",
    description: ".",
  },
  {
    title: "Nolstagic",
    description: "."
  },
  {
    title: "Rock",
    description: "."
  },
  {
    title: "Metal",
    description: "."
  },
  {
    title: "Grunge",
    description: "."
  },
  {
    title: "Pop",
    description: "."
  }
];


function Moods() {
  return (
    <div className="card">
     <div className="Moods text center p-5">
      <h2>Select a Playlist for your mood!</h2>
    </div>
    </div>
  );
}

export default Moods;