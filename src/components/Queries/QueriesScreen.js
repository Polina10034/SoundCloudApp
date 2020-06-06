import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';
import { ListItem, Card } from 'react-native-elements';

function QueriesScreen() {
  const searchQueries = useSelector((state) => state.songs.searchQueries);

  //   const dispatch = useDispatch();

  return (
    <ScrollView>
      <Card style={styles.card}>
        {searchQueries
          .map((item, i) => (
            <ListItem key={i} title={` ${item}`} style={styles.songItem} bottomDivider />
          ))
          .reverse()}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

export default QueriesScreen;
