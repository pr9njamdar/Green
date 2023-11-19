
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
const projectId = 'c0954544-2b85-4a11-9a38-8f57b47f6aec'
import { Platform } from 'react-native';
async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
  
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
  
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: projectId,
      });
      
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token.data;
  }

  module.exports=registerForPushNotificationsAsync