import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import "./track.css";

function Track({ trackImage, trackName, trackArtist, trackId }) {
  const [{ trackViewStatus }, dispatch] = useStateValue();
  const handleTrackView = () => {
    dispatch({
      type: "SET_TRACK_VIEW",
      trackId: trackId,
      trackName: trackName,
      trackImage: trackImage,
      trackArtist: trackArtist,
      isTrue: true,
    });
  };
  return (
    <div onClick={handleTrackView} className={"track"}>
      <div className="track__img">
        <img src={trackImage} alt="" />
      </div>
      <div className="track__content">
        <h5>{trackName.slice(0, 15)}..</h5>
        <small>
          <p>{trackArtist.slice(0, 25)}</p>
        </small>
      </div>
      <div className="play__btn">
        <i className="fa fa-play"></i>
      </div>
    </div>
  );
}

export default Track;
