import React, { useEffect, useState } from 'react';
import { View, Text, TextInput,Button, TouchableOpacity, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as Location from 'expo-location';

const ComplaintForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedPollutionType, setSelectedPollutionType] = useState('Air Pollution'); // Default selection

  useEffect(()=>{
    (async()=>{
      await Location.requestForegroundPermissionsAsync({})
    })()
  },[])

  const handleSubmission = () => {    
    console.log('Name:', name);
    console.log('Address:', address);
    console.log('Pollution Type:', selectedPollutionType);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complaint Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Button title ="Get Address" onPress={async()=>{
          let add=await Location.getCurrentPositionAsync({});
          setAddress(()=>add)
      }} />
      <Picker
        selectedValue={selectedPollutionType}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedPollutionType(itemValue)}
      >
        <Picker.Item label="Air Pollution" value="Air Pollution" />
        <Picker.Item label="Water Pollution" value="Water Pollution" />
        <Picker.Item label="Plastic" value="Plastic" />
      </Picker>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmission}>
        <Text style={styles.submitButtonText}>Submit</Text>
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
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    width: 300,
    height: 40,
  },
  submitButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ComplaintForm;
