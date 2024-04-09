import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GlobalStyles } from "../../constants/globalStyles";
import COLORS from "../../constants/colors";

type Props = {
  imageUri: string;
  setImageUri: React.Dispatch<React.SetStateAction<string>>;
};

const PictureSelection = ({ imageUri, setImageUri }: Props) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const onPressImagePicker = () => {
    pickImage();
  };

  return (
    <View>
      <TouchableOpacity onPress={onPressImagePicker}>
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={GlobalStyles.fullWidthAndHeight}
            />
          ) : (
            <View style={styles.textContainer}>
              <Text style={styles.text}>Select image</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PictureSelection;

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: COLORS.lightPurple,
    height: 100,
    width: 100,
    borderRadius: 16,
    overflow: "hidden",
    alignSelf: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
  },
});
