import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  useWindowDimensions,
} from "react-native";
import { useContext } from "react";
import { ValueContext } from "../context/valueContext";
import * as ImagePicker from "expo-image-picker";

export default function Home({ save }) {
  const { setChoseTakePhoto, description, setDescription, setphoto, photo } =
    useContext(ValueContext);
  const { height, width } = useWindowDimensions();

  const escolherImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.5,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setphoto(result.assets[0]);
    }
  };
  let imagePadding = 96;
  let propwidth;
  if (photo) {
    if (photo.width < width) {
      imagePadding = width - photo.width;
      width = imageWidth;
    }
    if (photo.width > width && photo.width < photo.height) {
      propwidth = width * (photo.width / photo.height) - imagePadding;
    } else {
      propwidth = width  - imagePadding;
    }
  }

  return (
    <View>
      <View style={styles.imgContainer}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{
              height: "100%",
              width: propwidth,
            }}
          />
        )}
      </View>
      <Pressable style={styles.btn} onPress={() => setChoseTakePhoto(true)}>
        <Text style={styles.btnTxt}>TIRAR FOTO</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={escolherImagem}>
        <Text style={styles.btnTxt}>ESCOLHER DA GALERIA</Text>
      </Pressable>
      <TextInput
        style={styles.input}
        numberOfLines={5}
        value={description}
        onChangeText={setDescription}
      />

      <Pressable style={[styles.btn, styles.btnPublicar]} onPress={save}>
        <Text style={styles.btnTxt}>PUBLICAR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    backgroundColor: "#cecece",
    marginBottom: 25,
    textAlignVertical: "top",
    padding: 12,
    marginTop: "15%",
  },
  btn: {
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "blue",
    marginTop: 25,
    borderRadius: 5,
  },
  btnPublicar: {
    marginTop: "15%",
  },
  btnTxt: {
    color: "white",
    fontSize: 24,
  },
  imgContainer: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
});
