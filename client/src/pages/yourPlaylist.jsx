import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function yourPlaylist() {
    const location = useLocation();

    
useEffect(() => {
    const getBackgroundColor = () => {
        if (location.pathname === '/') {
          document.body.style.backgroundColor = '#f9b713'; // Sets this background color only for home route
        } else {
          document.body.style.backgroundColor = 'white'; // Set default background color of white for everywhere else
        }
      };

      getBackgroundColor();

      return () => {
        document.body.style.backgroundColor = ''; // Reset background color when component unmounts
      };
    }, [location]);
  
    return (
        <div className="container">
          <div className="home text-center p-5">
            <h2>Previously listened to.</h2>
            <a href="/moods">
              <button className="p-3 mt-3 home-button">Playlist history</button>
            </a>
          </div>
        </div>
      );
    }
    
    export default yourPlaylist;