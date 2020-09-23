import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { getTokenFromUrl } from "../spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "../StateProvider";

const spotify = new SpotifyWebApi();

function Sidebar({ userToken }) {
  const [Playlists, setPlaylists] = useState([]);
  const [{ trackViewStatus }, dispatch] = useStateValue();

  useEffect(() => {
    if (userToken) {
      spotify.setAccessToken(userToken);
      spotify.getUserPlaylists().then((playlists) => {
        setPlaylists(playlists.items);
      });
    }
  }, []);

  const showPlaylist = (name, id, image, artist) => {
    dispatch({
      type: "SET_TRACK_VIEW",
      trackId: id,
      trackName: name,
      trackImage: image,
      trackArtist: artist,
      isTrue: true,
      trackType: "playlist",
    });
  };

  const handleTrackView = () => {
    dispatch({
      type: "SET_TRACK_VIEW",
      trackId: "",
      trackName: "",
      trackImage: "",
      trackArtist: "",
      isTrue: false,
    });
  };
  console.log(Playlists[0]);
  return (
    <div className="sidebar">
      <img
        onClick={handleTrackView}
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <div className={"sidebar__nav"}>
        <div
          onClick={handleTrackView}
          className={
            trackViewStatus.isTrue ? "nav__option" : "nav__option active"
          }
        >
          <i className="fa fa-home"></i> <span>Home</span>
        </div>
        <div className="nav__option">
          <i className="fa fa-search"></i> <span>Search</span>
        </div>
        <div className="nav__option">
          <i className="fa fa-music"></i> <span>Your Library</span>
        </div>
      </div>
      <p className="playlists__header">PLAYLISTS</p>
      <div className="playlists">
        {Playlists.map((playlist) => (
          <p
            onClick={(e) =>
              showPlaylist(
                playlist.name,
                playlist.id,
                playlist.images[0].url,
                playlist.owner.display_name
              )
            }
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
