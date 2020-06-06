import * as types from './TracksActionTypes';

function constructUrl(searchQuery) {
  if (searchQuery)
    return `https://api.soundcloud.com/tracks?client_id=CW62xLA9h8wXrXC1WIaSX9OWA6novVIE&limit=50&q=${searchQuery}`;
  return 'https://api.soundcloud.com/tracks?client_id=CW62xLA9h8wXrXC1WIaSX9OWA6novVIE&limit=50';
}

const loadTracks = () => async (dispatch) => {
  let data = [];
  const apiUrl =
    'https://api.soundcloud.com/tracks?client_id=CW62xLA9h8wXrXC1WIaSX9OWA6novVIE&limit=50';
  try {
    data = await fetch(apiUrl).then((respons) => respons.json());
  } catch (err) {
    console.log('error frtching...', err);
  }
  const tracksData = data.map((item) => ({
    id: item.id,
    artist: item.user,
    playCount: item.playback_count,
    title: item.title,
    img: item.artwork_url,
    sound: item.stream_url,
    playing: false
  }));

  dispatch({ type: types.TRACKS_LOADED, tracksList: tracksData });
};

const setSearch = (text) => {
  return { type: types.SEARCH_QUERY_CHANGED, text };
};

const searchItems = (query) => async (dispatch) => {
  setLoadingStatus(true);
  let data = [];
  const apiUrl = constructUrl(query);
  try {
    data = await fetch(apiUrl).then((respons) => respons.json());
    const seacrhTracksData = data.map((item) => ({
      id: item.id,
      artist: item.user,
      playCount: item.playback_count,
      title: item.title,
      img: item.artwork_url,
      sound: item.stream_url,
      playing: false
    }));
    dispatch({ type: types.SEARCH_QUERY_DONE, seacrhTracksData, query });
  } catch (err) {
    console.log('error fetching...', err);
    dispatch({ type: types.NOT_FOUND, query });
  }
};

const setSongToPlay = (id, urlSound, status) => async (dispatch) => {
  dispatch({ type: types.TOGGLE_SOUND, status, urlSound });
};

const setLoadingStatus = (status) => {
  return { type: types.SET_LOADING, status };
};

export default { loadTracks, searchItem: searchItems, setSongToPlay, setSearch, setLoadingStatus };
