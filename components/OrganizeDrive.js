import * as React from 'react';
import { Button, Text, Platform, TextInput, View, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import getEnvVars from '../config';
import { decode } from 'base-64';
const { apiUrl, debug } = getEnvVars();
import * as Location from 'expo-location';

const OrganizeDrive = () => {
    const [message, setMessage] = React.useState('');
    const [type, setType] = React.useState('Cleanliness Drive');
    const [image, setImage] = React.useState(null);
    const [title, setTitle] = React.useState('');
    const [address,setAddress]=React.useState('');
    React.useEffect(() => {
        (async () => {
          await Location.requestForegroundPermissionsAsync({})
        })()
      }, [])
      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result.assets[0]);
        if (!result.canceled) {
            setImage(result.assets[0]);
            console.log(image)           
        }
    };
    const MakeCampaign = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('message', message);
        formData.append('type', type);
        formData.append('uid', '6554b160574029879282cff4');
        formData.append('address',address)
        console.log(address,title,message,type)
        if (Platform.OS == 'web') {
            //  const base64Data = image.uri.split(',')[1];
            //  const binaryData = decode(base64Data);
            //  const blob = new Blob([binaryData], { type: 'image/png' });
            //  formData.append('image', blob, 'photo.png');
        }
        else {
            formData.append('image', {
                uri: image.uri,
                name: 'photo.png',
                type: 'image/png'
            });
        }
        const response = await fetch(`${apiUrl}/Drive/Organize`, {
            method: 'POST',
            body: formData,
        })
        console.log(response.body);
    }

  

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Organize Drive</Text>
            <TextInput
                style={styles.input}
                placeholder='title'
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder='Message for participants'
                value={message}
                onChangeText={setMessage}
            />
            <Button title="Current Location" onPress={async () => {
        let add = await Location.getCurrentPositionAsync({});
        add = {
          lat: add.coords.latitude,
          long: add.coords.longitude
        }
        setAddress(() => add)
      }} />
            <Picker
                style={styles.input}
                selectedValue={type}
                onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
                <Picker.Item label="Cleanliness Drive" value="Cleanliness Drive" />
                <Picker.Item label="Tree Plantation" value="Tree Plantation" />
            </Picker>
            {(image) ? <Image width={100} height={100} source={{ uri: image.uri }} /> : <></>}
            <Button title="upload image loaction" onPress={pickImage} />
            <Button title='Done' onPress={MakeCampaign} />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    heading: {
        fontSize: 24,
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        width: '100%',
    },
});

export default OrganizeDrive;
