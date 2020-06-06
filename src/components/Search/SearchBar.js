import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { func, string } from 'prop-types';

const SearchItem = ({ onSearch }) => {
  const [query, setquery] = useState('');
  return (
    <View>
      <SearchBar
        style={styles.search}
        placeholder="Search..."
        platform="ios"
        onChangeText={(text) => setquery(text)}
        onSubmitEditing={() => {
          onSearch(query);
        }}
        value={query}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    height: '20',
    padding: '0'
  }
});

SearchItem.propTypes = {
  onSearch: func,
  searchQuery: string
};

export default SearchItem;
