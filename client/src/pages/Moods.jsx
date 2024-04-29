

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
     <div class="row">
      <header>Select a Playlist for your mood!</header>
      <div class="column left" style="background-color:#yellow;">
        <button>Happy</button>
        </div>
        <div class="column left" style="background-color:#blue;">
            <button>Sad</button>
        </div>
        <div class="column left" style="background-color:#orange;">
            <button>Energized</button>
        </div>
        <div class="column left" style="background-color:#purple;">
            <button>Nolstagic</button>
        </div>
        <div class="column right" style="background-color:#red;">
            <button>Rock</button>
        </div>
        <div class="column right" style="background-color:#black;">
            <button>Metal</button>
        </div>
        <div class="column right" style="background-color:#green;">
            <button>Grunge</button>
        </div>
        <div class="column right" style="background-color:#pink;">
            <button>Pop</button>
        </div>
    </div>
    </div>
  );
}

export default Moods;