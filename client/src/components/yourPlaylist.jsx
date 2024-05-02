import React, { useState } from 'react';
import AuthService from '../utils/auth'; 
import yourPlaylist from '../pages/yourPlaylist';

function yourPlaylist() {
  
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