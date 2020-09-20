import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Sidebar from "./Components/Sidebar";
import Feed from "./Components/Feed";

import TrackView from "./Components/TrackView";
const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    if (hash.access_token) {
      setToken(hash.access_token);
      spotify.setAccessToken(hash.access_token);
      spotify.getUserPlaylists().then((playlist) => {
        return playlist;
      });
    }
    console.log(token);
  });
  return (
    <div className="App">
      {token ? (
        <div className="player">
          <Sidebar userToken={token} />
          <Feed userToken={token} />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
