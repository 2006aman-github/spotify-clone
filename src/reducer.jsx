export const initialState = {
  trackViewStatus: {
    isTrue: false,
    trackId: "",
    trackName: "",
    trackImage: "",
    trackArtist: "",
    type: "",
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
    default:
      return state;
  }
};

export default reducer;
