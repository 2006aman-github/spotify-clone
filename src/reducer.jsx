export const initialState = {
  trackViewStatus: {
    isTrue: false,
    trackId: "",
    trackName: "",
    trackImage: "",
    trackArtist: "",
    type: "",
    openSideBar: false,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TRACK_VIEW":
      return {
        ...state,
        trackViewStatus: {
          isTrue: action.isTrue,
          trackId: action.trackId,
          trackImage: action.trackImage,
          trackName: action.trackName,
          trackArtist: action.trackArtist,
          type: action.trackType,
        },
      };
    case "HANDLE_SIDEBAR":
      return {
        ...state,
        openSideBar: action.openSideBar,
      };
    default:
      return state;
  }
};

export default reducer;
