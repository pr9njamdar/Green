import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const OrgainzeDrives = ({ data, onItemClick }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onItemClick(item)}>
      <View style={styles.item}>
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
  // here we will display all the upcoming drives.
  const data1 = [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' },
    // Add more items as needed
  ];

  return (
    <FlatList
      data={data1}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default OrgainzeDrives;

