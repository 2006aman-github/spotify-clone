export const initialState = {
  trackViewStatus: {
    isTrue: false,
    trackId: "",
    trackName: "",
    trackImage: "",
    trackArtist: "",
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
        },
      };
    default:
      return state;
  }
};

export default reducer;
