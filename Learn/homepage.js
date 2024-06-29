import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const HomePage = () => {
  // Dummy data for categories and items
  const categories = [
    { id: 1, title: 'Books', items: [
      { id: 1, name: 'Book 1', image: require('./assets/book1.jpg'), price: '$10' },
      { id: 2, name: 'Book 2', image: require('./assets/book2.jpg'), price: '$15' },
      { id: 3, name: 'Book 3', image: require('./assets/book3.jpg'), price: '$20' },
    ]},
    { id: 2, title: 'Electronics', items: [
      { id: 4, name: 'Phone 1', image: require('./assets/phone1.jpg'), price: '$500' },
      { id: 5, name: 'Laptop 1', image: require('./assets/laptop1.jpg'), price: '$1200' },
    ]},
  ];

  const renderCategoryItems = (items) => {
    return items.map(item => (
      <TouchableOpacity key={item.id} style={styles.itemContainer}>
        <Image source={item.image} style={styles.itemImage} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Welcome to Our Store!</Text>
      {categories.map(category => (
        <View key={category.id} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderCategoryItems(category.items)}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    marginRight: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: 'green',
  },
});

export default HomePage;
