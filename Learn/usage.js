import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';

const data = [
  { id: 1, title: 'Book 1' },
  { id: 2, title: 'Book 2' },
  { id: 3, title: 'Phone 1' },
  { id: 4, title: 'Laptop 1' },
  // Add more items as needed
];

const App = () => {
  return (
    <View style={styles.container}>
      <SearchBar data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 50,
  },
});

export default App;
