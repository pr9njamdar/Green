import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuPage = () => {
  const navigation = useNavigation();

  const goToComplaintOptions = () => {
    navigation.navigate('ComplaintForm');
  };
  const handleItemClick = (item) => {
    // Handle item click logic here
    console.log(`Item clicked: ${item.title}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <TouchableOpacity style={styles.optionButton} onPress={goToComplaintOptions}>
        <Text style={styles.optionText}>Register Complaint</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('OrganizeDrive')} style={styles.optionButton}>
        <Text style={styles.optionText}>Organize a Drive</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('UpcomingDrives')} style={styles.optionButton}>
        <Text style={styles.optionText}>upcoming Drives</Text>
      </TouchableOpacity>
      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    margin: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MenuPage;
