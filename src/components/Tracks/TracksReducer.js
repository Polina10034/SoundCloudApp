import {
  TRACKS_LOADED,
  SEARCH_QUERY_CHANGED,
  SEARCH_QUERY_DONE,
  TOGGLE_SOUND,
  NOT_FOUND,
  SET_LOADING
} from './TracksActionTypes';
import { Audio } from 'expo-av';

const initialState = {
  tracksList: [],
  memoizeTracks: [],
  isLoading: true,
  searchQueries: [],
  isPlaying: false,
  songPlaying: null,
  nextPlaying: null,
  searchQuery: null,
  isFound: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TRACKS_LOADED:
      return {
        ...state,
        tracksList: action.tracksList,
        memoizeTracks: action.tracksList,
        isLoading: false,
        isFound: true
      };
    case SEARCH_QUERY_CHANGED: {
      return {
        ...state,
        isLoading: true,
        searchQuery: action.text
      };
    }
    case SEARCH_QUERY_DONE: {
      return {
        ...state,
        tracksList: action.seacrhTracksData,
        memoizeTracks: state.memoizeTracks,
        isLoading: false,
        isFound: true,
        searchQuery: action.query,
        searchQueries: [...state.searchQueries, action.query]
      };
    }

    case NOT_FOUND: {
      return {
        ...state,
        isLoading: false,
        isFound: false,
        searchQuery: action.query,
        searchQueries: [...state.searchQueries, action.query]
      };
    }
    case TOGGLE_SOUND: {
      if (!action.status) {
        (async () => {
          const { sound } = await Audio.Sound.createAsync(
            {
              uri: `${action.urlSound}?client_id=CW62xLA9h8wXrXC1WIaSX9OWA6novVIE`
            },
            {
              shouldPlay: true,
              volume: 0.25,
              isLooping: true
            }
          );
          this.sound = sound;
        })();
        return {
          ...state,
          isPlaying: true
        };
      } else if (action.status) {
        (async () => {
          if (this.sound !== null) {
            await this.sound.pauseAsync();
          }
        })();
        return { ...state, isPlaying: false };
      }
      return { ...state };
    }
    case SET_LOADING: {
      return {
        ...state,
        tracksList: [],
        isLoading: true
      };
    }
    default:
      return state;
  }
};
