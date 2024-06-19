import {
  Text,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';

export default function Card({ image, description }) {
  const { height, width } = useWindowDimensions();
  const styles = style(height, width, image.width, image.height);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image style={styles.image} source={{ uri: image.uri }} />
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const style = (height, width, imageWidth, imageHeight) => {
  let imagePadding = 0;
  if (imageWidth < width) {
    imagePadding = width - imageWidth;
    width = imageWidth;
  }
  const proporcaoImagem = (imageHeight / imageWidth) * width;
  const style = StyleSheet.create({
    image: {
      height: proporcaoImagem,
      width: width - 48 + imagePadding,
      borderRadius: 5,
      alignSelf: 'center',
    },
    container: {
      height: proporcaoImagem + 48 + 48,
      width: width + imagePadding,
      padding: 24,
      alignSelf: 'center',
    },
    subContainer: {
      borderBottomWidth: 1,
      borderColor: '#cecece',
      width: width - 48 + imagePadding,
    },
    description: {
      margin: 24,
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
  return {
    image: style.image,
    container: style.container,
    subContainer: style.subContainer,
    description: style.description,
  };
};
