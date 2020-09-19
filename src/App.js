import React, { useEffect, useState } from "react";

import { useStateValue } from "./StateProvider";
import "./App.css";
import Login from "./Components/Login";

import Player from "./Components/Player";
import { getUserPlaylist } from "./reducer";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
const spotify = new SpotifyWebApi();

function App() {
  const [{ user }, dispatch] = useStateValue();
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
  });
  return <div className="App">{token ? <Player /> : <Login />}</div>;
}

export default App;
