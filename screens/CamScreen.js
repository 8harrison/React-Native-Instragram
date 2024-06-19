import { Camera } from 'expo-camera';
import { StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { ValueContext } from '../context/valueContext';

export default function CamScreen() {
  const [camera, setCamera] = useState();
  const { setChoseTakePhoto, setphoto } = useContext(ValueContext);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (camera) {
      camera.props.ratio = '16:9';
    }
  }, [camera]);

  const verifyPermission = async () => {
    await Camera.requestCameraPermissionsAsync();
  };

  const styles = style(width, height);

  const takePhoto = async () => {
    await verifyPermission();
    const picture = await camera.takePictureAsync();
    setphoto(picture);
    setChoseTakePhoto(false);
  };

  return (
    <Camera style={styles.camera} ref={(ref) => setCamera(ref)}>
      <Pressable style={styles.btnTakePicture} onPress={takePhoto}></Pressable>
    </Camera>
  );
}

const style = (width, height) => {
  const styles = StyleSheet.create({
    camera: {
      width: width,
      height: height,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    btnTakePicture: {
      backgroundColor: 'red',
      width: 75,
      height: 75,
      borderRadius: 50,
      margin: 50,
      opacity: 0.5,
    },
  });
  return styles;
};
