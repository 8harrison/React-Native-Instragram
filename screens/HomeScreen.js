 import { View, StyleSheet, Modal } from 'react-native';
import { useContext } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import CamScreen from './CamScreen';
import Home from '../components/Home';
import { ValueContext } from '../context/valueContext';

export default function HomeScreen({ navigation }) {
  const { choseTakePhoto, description, setDescription, photo, setphoto } =
    useContext(ValueContext);

  const { setItem, getItem } = useAsyncStorage('@photos');

  const save = async () => {
    const photos = JSON.parse(await getItem());
    if (photos) {
      await setItem(JSON.stringify([...photos, { photo, description }]));
    } else {
      await setItem(JSON.stringify([{ photo, description }]));
    }
    setDescription('');
    setphoto();
    navigation.navigate('Feed');
  };

  return (
    <View style={styles.container}>
    <Modal visible={choseTakePhoto}>
      <CamScreen /> 
      </Modal>
       <Home save={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    width: '100%',
    height: '100%',
  },
});
