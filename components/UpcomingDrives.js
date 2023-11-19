import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import getEnvVars from '../config';
const { apiUrl, debug } = getEnvVars();
import * as Location from 'expo-location';

const OrgainzeDrives = () => {
  const [data,setData]=useState([])
  useEffect(()=>{
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetch(`${apiUrl}/Drive/local`,{
        method:'POST',
        body:JSON.stringify({
          latitude:location.coords.latitude,
          longitude:location.coords.longitude,
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }).then(async (res)=>{
        const response = await res.json()
        console.log(response);
      })
    })();
   
  },[])
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onItemClick(item)}>
      <View style={styles.item}>
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
  // here we will display all the upcoming drives.
  return (
    <FlatList
      data={data}
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

