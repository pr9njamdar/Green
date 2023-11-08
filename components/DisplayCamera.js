import {Camera,CameraType} from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet,ImageBackground, View } from 'react-native';

export default function DisplayCamera()
{
    let camera;
    const[permission,requestPermission]=Camera.useCameraPermissions();
    const [uri,setUri]=useState(null);
    const image={uri:uri}
    return (
        <View style={{borderRadius:20, overflow:'visible', height:250,width:250}}>
        <Camera ref={ref=>(camera=ref)} type={CameraType.back} style={{height:100,width:150}}>
        </Camera>
        <Button onPress={async ()=>{
            const photo=await camera.takePictureAsync();
            
            setUri(()=>photo.uri)
            
        }} title="Capture"/>

        {(uri!==null)?<ImageBackground style={{width:50,height:50}} source={image}/>:<></>}        
        </View>
    )
}