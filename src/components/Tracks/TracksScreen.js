import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { arrayOf, string, bool, shape, func, number, object } from 'prop-types';

function TrackScreen(props) {
  const { songs, onPlay, status, resultsStatus } = props;
  return (
    <ScrollView>
      <Card style={styles.card}>
        {resultsStatus ? (
          songs.map((item, i) => (
            <ListItem
              key={i}
              leftAvatar={{
                rounded: false,
                size: 'medium',
                source: {
                  uri:
                    item.img !== null
                      ? item.img.replace('large', 'small')
                      : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdlpng.com%2Fpng%2F6331252&psig=AOvVaw0DdhzUUSWb2km1qL-Z3ePM&ust=1589716127294000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPDBhZyouOkCFQAAAAAdAAAAABAI'
                }
              }}
              title={item.title}
              subtitle={'By: ' + item.artist.username + '  Play Count: ' + item.playCount}
              style={styles.songItem}
              rightIcon={{ name: 'play-arrow' }}
              onPress={() => onPlay(item.id, item.sound, status)}
              bottomDivider
            />
          ))
        ) : (
          <View style={styles.mainView}>
            <Text>No Results Were Found</Text>
          </View>
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

TrackScreen.propTypes = {
  songs: arrayOf(
    shape({
      id: number,
      title: string,
      artist: object,
      playCount: number,
      img: string,
      sound: string,
      playing: bool
    })
  ),
  onPlay: func,
  status: bool,
  resultsStatus: bool
};

export default TrackScreen;
