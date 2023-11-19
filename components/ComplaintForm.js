import React, { useEffect, useState } from 'react';
import { View, Text, Platform, TextInput, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { decode } from 'base-64';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import getEnvVars from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MapScreen from './MapScreen';



const { apiUrl, debug } = getEnvVars();

const ComplaintForm = () => {


  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedPollutionType, setSelectedPollutionType] = useState('Air Pollution'); // Default selection
  const [image, setImage] = useState(null);
  const [ExpoPushToken, setExpoPushToken] = useState(null)
 
  let handleSubmit;
  if (Platform.OS == 'web') {
    handleSubmit = async () => {
      try {
        const base64Data = image.uri.split(',')[1];
        const binaryData = decode(base64Data);
        const blob = new Blob([binaryData], { type: 'image/png' });
        const formData = new FormData();
        formData.append('image', blob, 'photo.png');
        formData.append('Description', name);                 // make change here...
        formData.append('type', selectedPollutionType);
        formData.append('latitude', address.latitude);
        formData.append('longitude', address.longitude);  // address is not stored properly plz revert back here...
        formData.append('uid', '6554b160574029879282cff4')


        const response = await fetch(`${apiUrl}/User/RegisterComplaint`, {
          method: 'POST',
          body: formData,
        });

        console.log('Server response:', response.json());
      } catch (error) {
        console.error('Error uploading to server:', error);
      }
    }
  }
  // this code is for mobile device this needs to be tested once server has been deployed.
  else {
    handleSubmit = async () => {
      console.log(address, selectedPollutionType, name)
      const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        name: 'photo.png',
        type: 'image/png'
      })
      formData.append('Description', name);                 // make change here...
      formData.append('type', selectedPollutionType);
      formData.append('latitude', address.latitude);
      formData.append('longitude', address.longitude);
      formData.append('uid', await AsyncStorage.getItem('uid') )
      const response = await fetch(`${apiUrl}/User/RegisterComplaint`, {
        method: 'POST',
        body: formData,
      });
      const res=await response.json()
      if(res.success)
      {
        alert('Complaint was registered')
        navigation.navigate('Menu')
      }
    }

  }

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complaint Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <MapScreen selectAdd={setAddress}/>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
      </View>
      <Picker
        selectedValue={selectedPollutionType}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedPollutionType(itemValue)}
      >
        <Picker.Item label="Air Pollution" value="Air Pollution" />
        <Picker.Item label="Water Pollution" value="Water Pollution" />
        <Picker.Item label="Plastic" value="Plastic" />
      </Picker>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
