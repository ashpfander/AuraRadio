import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();

  // Sets the background color based on path
  const getBackgroundColor = () => {
    if (location.pathname === '/') {
      return '#f9b713'; // Sets this background color only for home route
    } else {
      return 'white'; // Set default background color of white for everywhere else
    }
  };

  // Dynamically set the body background color based on the path
  document.body.style.backgroundColor = getBackgroundColor();

  return (
    <div className="container">
      <div className="home text-center p-5">
        <h2>Playlists that'll put you in a mood.</h2>
        <a href="/moods">
          <button className="p-3 mt-3 home-button">Explore Moods</button>
        </a>
      </div>
    </div>
  );
}

export default Home;