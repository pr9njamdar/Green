// AuthScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getEnvVars from '../config';
import { useNavigation } from '@react-navigation/native';
const { apiUrl, debug } = getEnvVars();
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import registerForPushNotificationsAsync from './PushToken'
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Notifications.addNotificationReceivedListener(notification => {
//   console.log('Notification received while app is in the foreground:', notification);
//   // Handle the notification as needed
// });


const AuthScreen = () => {
  const navigation = useNavigation();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync({})
    })();


  }, [])

  const handleAuth = async () => {

    const creds = {
      email: email,
      password: password,
    }
    if (isLogin) {
      fetch(`${apiUrl}/User/Login`, {
        method: 'POST',
        body: JSON.stringify(creds),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (res) => {
        const response = await res.json()

        if (response.userid) {
          await AsyncStorage.setItem('uid', response.userid)
          navigation.navigate('Menu');
        }
      })
    } else {
      registerForPushNotificationsAsync().then(token => { AsyncStorage.setItem('pushToken', token) });
      const pushToken = await AsyncStorage.getItem('pushToken')
      fetch(`${apiUrl}/User/Register`, {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          pushToken: pushToken
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (res) => {
        const response = await res.json()      
       
        if (response.doc._id) {
          await AsyncStorage.setItem('uid', response.doc._id)
          navigation.navigate('Menu');
        }
        console.log(response)
      })
    }
  };

  return (
    <View style={styles.container}>
      <Text>{isLogin ? 'Login' : 'Register'}</Text>
      {!isLogin && (
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      )}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title={isLogin ? 'Login' : 'Register'} onPress={handleAuth} />
      <Text onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%',
  },
});

export default AuthScreen;
