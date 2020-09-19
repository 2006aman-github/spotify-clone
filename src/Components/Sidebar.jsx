import React from "react";
import "./sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <div className="sidebar__nav">
        <div className="nav__option">
          <i className="fa fa-home"></i> <span>Home</span>
        </div>
        <div className="nav__option">
          <i className="fa fa-search"></i> <span>Search</span>
        </div>
        <div className="nav__option">
          <i className="fa fa-music"></i> <span>Your Library</span>
        </div>
      </div>
      <p className='playlists__header'>PLAYLISTS</p>
      <div className="playlists">playlists</div>
    </div>
  );
}

export default Sidebar;
