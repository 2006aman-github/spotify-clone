import React, { useEffect, useState } from "react";
import { getTokenFromUrl } from "../spotify";
import SpotifyWebApi from "spotify-web-api-js";
import "./feed.css";
import Track from "./Track";
import TrackView from "./TrackView";
import { useStateValue } from "../StateProvider";

const spotify = new SpotifyWebApi();

function Feed({ userToken }) {
  const [Tracks, setTracks] = useState([]);
  const [user, setUser] = useState({});
  const [userImage, setUserImage] = useState("");
  const [popularPlaylists, setPopularPlaylists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [BollywoodPlaylists, setBollywoodPlaylists] = useState([]);
  const [PunjabiPlaylists, setPunjabiPlaylists] = useState([]);
  const [FeaturedPlaylists, setFeaturedPlaylists] = useState([]);
  const [deviceId, setDeviceId] = useState("");
  const [{ trackViewStatus }, dispatch] = useStateValue();

  useEffect(() => {
    if (userToken) {
      spotify.setAccessToken(userToken);

      spotify.getNewReleases().then((releases) => {
        setPopularPlaylists(releases.albums.items.slice(0, 12));
      });
      spotify.getMyRecentlyPlayedTracks().then((recentTracks) => {
        setRecentlyPlayed(recentTracks.items.slice(0, 6));
        console.log(recentTracks.items);
      });
      spotify.getCategoryPlaylists("bollywood").then((bollywoodPlaylists) => {
        setBollywoodPlaylists(bollywoodPlaylists.playlists.items.slice(0, 10));
      });
      spotify.getCategoryPlaylists("punjabi").then((punjabiPlaylists) => {
        setPunjabiPlaylists(punjabiPlaylists.playlists.items);
        console.log(punjabiPlaylists.playlists.items);
      });
      spotify.getFeaturedPlaylists().then((featuredPlaylists) => {
        setFeaturedPlaylists(featuredPlaylists.playlists.items);
      });
    }
  }, []);

  useEffect(() => {
    spotify.getMe().then((user) => {
      setUser(user);
      setUserImage(user.images[0].url);
    });
  }, [user.images]);

  return (
    <div className="feed">
      <div className="feed__nav">
        <div className="profile__btn">
          <img src={userImage} alt="" />
          <span>{user?.display_name}</span>
          <span>
            <i className="fa fa-angle-down"></i>
          </span>
        </div>
      </div>
      {!trackViewStatus.trackId ? (
        <div className="feed__content">
          <div className="feed__content__row">
            <h2>Recently Played</h2>
            <br />
            <div className="row__content">
              {recentlyPlayed.map((recentTrack) => (
                <Track
                  trackImage={recentTrack.track.album.images[0].url}
                  trackName={recentTrack.track.name}
                  trackArtist={recentTrack.track.artists[0].name}
                />
              ))}
            </div>
          </div>
          <div className="feed__content__row">
            <h2>Popular Playlists</h2>
            <br />
            <div className="row__content">
              {popularPlaylists.map((popularPlaylist) => (
                <Track
                  trackImage={popularPlaylist.images[0].url}
                  trackName={popularPlaylist.name}
                  trackArtist={popularPlaylist.artists[0].name}
                  trackId={popularPlaylist.id}
                />
              ))}
            </div>
          </div>
          <div className="feed__content__row">
            <h2>Bollywood</h2>
            <br />
            <div className="row__content">
              {BollywoodPlaylists.map((BollywoodPlaylist) => (
                <Track
                  trackImage={BollywoodPlaylist.images[0].url}
                  trackName={BollywoodPlaylist.name}
                  trackArtist={BollywoodPlaylist.description}
                  trackId={BollywoodPlaylist.id}
                />
              ))}
            </div>
          </div>
          <div className="feed__content__row">
            <h2>Punjabi</h2>
            <br />
            <div className="row__content">
              {PunjabiPlaylists.map((PunjabiPlaylist) => (
                <Track
                  trackImage={PunjabiPlaylist.images[0].url}
                  trackName={PunjabiPlaylist.name}
                  trackArtist={PunjabiPlaylist.description}
                  trackId={PunjabiPlaylist.id}
                />
              ))}
            </div>
          </div>
          <div className="feed__content__row">
            <h2>Featured Playlists</h2>
            <br />
            <div className="row__content">
              {FeaturedPlaylists.map((FeaturedPlaylist) => (
                <Track
                  trackImage={FeaturedPlaylist.images[0].url}
                  trackName={FeaturedPlaylist.name}
                  trackArtist={FeaturedPlaylist.description}
                  trackId={FeaturedPlaylist.id}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <TrackView userToken={userToken} />
      )}
      <div className="song__row"></div>
    </div>
  );
}

export default Feed;
