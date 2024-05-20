import logo from './q.png';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [spotifyResponse, setSpotifyResponse] = useState(null);
  const [showSongData, setShowSongData] = useState(false);
  const urlRndmWord = 'https://random-word-api.herokuapp.com/word';
  const clientID = '172e850bd84042d0b2eda0ff9e5c32a1';
  const clientSecret = '55d23e6d99a045138d0867ff1d708399';
  
  const getRandomWord = async () => {
    try {
      const randomWordResponse = await fetch(urlRndmWord);
      if (randomWordResponse.ok) {
        const jsonRandomWordResponse = await randomWordResponse.json();
        console.log(jsonRandomWordResponse[0])
        return jsonRandomWordResponse[0];
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSpotifyToken = async () => {
    try {
      const spotifyTokenResponse = await fetch(
        `https://accounts.spotify.com/api/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
        }
      );
      if (spotifyTokenResponse.ok) {
        const jsonSpotifyTokenResponse = await spotifyTokenResponse.json();
        return jsonSpotifyTokenResponse.access_token;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSpotifySong = async (searchQuery, token) => {
    try {
      const spotifyResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=1&include_external=audio`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (spotifyResponse.ok) {
        const jsonSpotifyResponse = await spotifyResponse.json();
        setSpotifyResponse(jsonSpotifyResponse);
        setShowSongData(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = async () => {
    const searchQuery = await getRandomWord();
    const token = await fetchSpotifyToken();
    if (searchQuery && token) {
      await getSpotifySong(searchQuery, token);
    }
  };

  return (
    <div className="App">
      {!showSongData && (
        <>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Don't know what to listen to?</h2>
          Click the button and get the a song from Spotify<br/><br/>
        </>
      )}
      {showSongData && spotifyResponse && (
        <div>
          {/* Render Spotify response here */}
          {spotifyResponse.tracks ? (
            <div className='songData'>
              <img className='albumCover'
                src={
                  spotifyResponse.tracks.items[0].album.images.length > 0
                    ? spotifyResponse.tracks.items[0].album.images[0].url // Use actual cover image if available
                    : logo // Use default cover image if actual cover is not available
                }
                alt="Album Cover"
              />
              <p>Track Name: <h2>{spotifyResponse.tracks.items[0].name}</h2></p>
              <p>Artist Name: <h2>{spotifyResponse.tracks.items[0].artists[0].name}</h2></p>
              <p>Album Name: <h2>{spotifyResponse.tracks.items[0].album.name}</h2></p>
              <p>
                <a
                  href={spotifyResponse.tracks.items[0].external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Listen on Spotify
                </a>
              </p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
      <button onClick={handleButtonClick}>Fetch Spotify Song</button>
      <p className='footer'>Powered on Spotify Web API and random-word-api.herokuapp.com</p>
    </div>
  );
}

export default App;
