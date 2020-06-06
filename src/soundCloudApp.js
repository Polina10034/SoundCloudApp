import React from 'react';
import { arrayOf, string, bool, shape, func, number, object } from 'prop-types';
import { StyleSheet, ActivityIndicator, View, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import ConnectedTrackScreen from './components/Tracks/TracksScreen';
import SearchItem from './components/Search/SearchBar';
import actions from './components/Tracks/TracksAction';

const mapStateToProps = ({ songs }) => {
  return {
    list: songs.tracksList,
    isLoading: songs.isLoading,
    isPlaying: songs.isPlaying,
    songPlaying: songs.songPlaying,
    nextPlaying: songs.nextPlaying,
    isFound: songs.isFound
  };
};

class SoundCloudApp extends React.Component {
  componentDidMount() {
    this.props.loadTracks();
  }

  render() {
    const {
      isLoading,
      list,
      isFound,
      searchItem,
      setSongToPlay,
      isPlaying,
      setSearch,
      navigation
    } = this.props;

    console.log(list[0]);

    return (
      <SafeAreaView style={styles.safe}>
        <View>
          <SearchItem onSearch={searchItem} onChange={setSearch} loadingStatus={isLoading} />

          {isLoading ? (
            <View style={styles.indicator}>
              <ActivityIndicator size={'large'} color={'#2fcccc'} />
            </View>
          ) : (
            <View>
              <ConnectedTrackScreen
                songs={list}
                onPlay={setSongToPlay}
                status={isPlaying}
                resultsStatus={isFound}
              />
            </View>
          )}
        </View>
        <View style={styles.viewBtn}>
          <Button title="Recent Queries" onPress={() => navigation.navigate('QueriesScreen')} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: 'center'
  },
  viewBtn: {
    borderWidth: 0,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    width: '100%'
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

SoundCloudApp.propTypes = {
  list: arrayOf(
    shape({
      id: number,
      title: string,
      artist: object,
      playCount: number,
      img: string,
      song: string
    })
  ),
  searchItem: func,
  isLoading: bool,
  loadTracks: func,
  setSongToPlay: func,
  isPlaying: bool,
  isFound: bool,
  setSearch: func,
  navigation: object
};

const ConnectedSoundCloudApp = connect(mapStateToProps, actions)(SoundCloudApp);

export default ConnectedSoundCloudApp;
