// MapScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({selectAdd}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
    selectAdd(coordinate)
    
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude:  18.4504433,
          longitude:73.868921,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Selected Location" />
        )}
      </MapView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:200,
    width:200
  },
  map: {
    flex: 1,
    width: '100%',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
  },
});

export default MapScreen;
