import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import Card from '../components/Card';
import { useEffect, useState } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export default function FeedScreen({ navigation }) {
  const [fotos, setFotos] = useState([]);
  const { getItem, setItem } = useAsyncStorage('@photos');

  const readFromStorage = async () => {
    const item = await getItem();
    if (!item) await setItem(JSON.stringify([]));
    setFotos(JSON.parse(item));
  };
  useEffect(() => {
    readFromStorage();
  }, [setItem, getItem]);

  const publish = () => {
    navigation.navigate('Publicar');
  };

  const resetFeed = () => {
    const newState = JSON.stringify([]);
    setItem(newState);
    setFotos([]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={publish}>
        <Text style={[styles.btnSymbol, { fontSize: 40 }]}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, styles.btnErase]}
        onPress={resetFeed}>
        <Text style={styles.btnSymbol}>x</Text>
      </TouchableOpacity>
      {fotos && (
        <FlatList
          data={fotos}
          renderItem={({ item }) =>
            item.photo && (
              <Card image={item.photo} description={item.description} />
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 50,
    right: 30,
    borderRadius: 50,
    zIndex: 1,
  },
  btnSymbol: {
    color: 'white',
    fontSize: 36,
    textAlign: 'center',
    fontWeight: '500',
  },
  btnErase: {
    bottom: 150,
    alignContent: 'center',
    backgroundColor: 'red',
  },
  container: {
    height: '100%',
  },
});
