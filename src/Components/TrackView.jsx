import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import "./trackView.css";
import SpotifyWebApi from "spotify-web-api-js";
import { useEffect } from "react";

const spotify = new SpotifyWebApi();

function TrackView({ userToken }) {
  const [{ trackViewStatus }, dispatch] = useStateValue();
  const [playlist, setPlaylist] = useState([]);
  const [isAlbum, setIsAlbum] = useState(false);

  useEffect(() => {
    if (userToken) {
      console.log(trackViewStatus.trackId);
      if (trackViewStatus.type === "playlist") {
        spotify.getPlaylistTracks(trackViewStatus.trackId).then((playlist) => {
          setPlaylist(playlist.items);
          // console.log(playlist.items[0].track.album);
        });
      } else if (trackViewStatus.type === "album") {
        spotify.getAlbumTracks(trackViewStatus.trackId).then((album) => {
          setPlaylist(album.items);
          console.log(album);
          setIsAlbum(true);
        });
      }
    }
  }, [trackViewStatus.trackId]);

  return (
    <div className="track__view">
      <div className="track__banner">
        <img src={trackViewStatus.trackImage} alt="" />
        <div className="track__details">
          <span>
            <strong>{"PLAYLIST"}</strong>
          </span>
          <h1>{trackViewStatus.trackName}</h1>
          <small>{trackViewStatus.trackArtist}</small>
        </div>
      </div>
      <div className="track__view__buttons">
        <span className="play__button">
          <i className="fa fa-play"></i>
        </span>
        <span>
          <i className="fa fa-ellipsis-h"></i>
        </span>
      </div>
      <div className="track__contents">
        {playlist.map((item) => (
          <div className="track__song">
            <div className="track__song__left">
              <img
                src={
                  isAlbum
                    ? trackViewStatus.trackImage
                    : item?.track?.album?.images[0]?.url
                }
                alt=""
              />
              <div className="song__details">
                <h4>{isAlbum ? item.name : item.track?.album.name}</h4>

                {isAlbum
                  ? item.artists.map((artist) => <small>{artist.name},</small>)
                  : item?.track?.album?.artists.map((artist) => (
                      <small>{artist.name},</small>
                    ))}
              </div>
            </div>
            <div className="track__song__center">
              <small>
                {isAlbum
                  ? item.name.slice(0, 45)
                  : item?.track?.album.name.slice(0, 45)}
                ..
              </small>
            </div>
            <div className="track__song__right">
              <span>
                {Math.floor(
                  parseInt(
                    isAlbum ? item.duration_ms : item?.track?.duration_ms
                  ) / 60000
                )}{" "}
                min
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackView;
