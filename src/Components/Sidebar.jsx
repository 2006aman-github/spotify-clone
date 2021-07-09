import React, { useEffect, useState } from "react";
import "./sidebar.css";
// import { getTokenFromUrl } from "../spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "../StateProvider";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DehazeIcon from "@material-ui/icons/Dehaze";

const spotify = new SpotifyWebApi();

function Sidebar({ userToken }) {
  const [Playlists, setPlaylists] = useState([]);
  const [{ trackViewStatus, openSideBar }, dispatch] = useStateValue();
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    if (userToken) {
      spotify.setAccessToken(userToken);
      spotify.getUserPlaylists().then((playlists) => {
        setPlaylists(playlists.items);
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
      console.log(window.innerWidth);
    });
    setWindowWidth(window.innerWidth);
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
  // console.log(Playlists[0]);
  return (
    <div
      className={
        windowWidth <= 650
          ? openSideBar
            ? "sidebar mobile__sidebar"
            : "sidebar hide__sidebar"
          : "sidebar"
      }
      // className="sidebar"
    >
      <div className="sidebar__icon close__icon">
        <IconButton
          color={"secondary"}
          onClick={(e) => {
            dispatch({
              type: "HANDLE_SIDEBAR",
              openSideBar: false,
            });
          }}
        >
          <CloseIcon color={"secondary"} />
        </IconButton>
      </div>
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
