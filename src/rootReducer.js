import { combineReducers } from 'redux';
import tracksReducer from './components/Tracks/TracksReducer';

export default combineReducers({
  songs: tracksReducer
});
