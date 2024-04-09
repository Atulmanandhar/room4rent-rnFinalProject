import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/globalStyles";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import PictureSelection from "../components/PictureSelection/PictureSelection";
import { uploadPropertyImage } from "../helpers/uploadPropertyImage";
import { getAuth } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { ROOM_COLLECTION_TITLE, db } from "../config/firebaseConfig";
import { convertImageUriToBlob } from "../helpers/convertImageUriToBlob";

export default function AddRoomScreen({ navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imageUri, setImageUri] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [numOfBedrooms, setNumOfBedrooms] = useState("");
  const [numOfBathrooms, setNumOfBathrooms] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const onSubmit = async () => {
    if (
      !imageUri ||
      !name ||
      !location ||
      !numOfBedrooms ||
      !numOfBathrooms ||
      !description ||
      !price
    ) {
      Alert.alert("Missing Fields", `Please enter all the details`);
      return;
    }
    try {
      setIsSubmitting(true);
      const collectionRef = collection(db, ROOM_COLLECTION_TITLE);

      const imageBlob = await convertImageUriToBlob(imageUri);
      const currentUserId = getAuth().currentUser.uid;
      const imageUrl = await uploadPropertyImage(imageBlob, currentUserId);

      const generateDocRef = doc(collectionRef);
      const generateDocId = generateDocRef.id;

      const formObj = {
        id: generateDocId,
        imageUrl: imageUrl,
        name,
        location,
        numOfBedrooms,
        numOfBathrooms,
        description,
        userId: currentUserId,
        price: Number(price),
      };
      await setDoc(generateDocRef, formObj);
      navigation.goBack();
    } catch (err) {
      setIsSubmitting(false);

      Alert.alert(
        "Error Listing Place",
        `Something went wrong, please try again : ${err?.message}`
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[GlobalStyles.screenTitle]}>List a Property</Text>
      <View>
        <PictureSelection setImageUri={setImageUri} imageUri={imageUri} />
      </View>

      <View style={styles.formContainer}>
        <Input textLabel="Name" onChangeText={setName} />
        <Input textLabel="Location Address" onChangeText={setLocation} />
        <View style={styles.multiInputContainer}>
          <Input
            textLabel="Number of bedrooms"
            onChangeText={setNumOfBedrooms}
            containerStyle={GlobalStyles.flex1}
          />
          <Input
            textLabel="Number of bathrooms"
            onChangeText={setNumOfBathrooms}
            containerStyle={GlobalStyles.flex1}
          />
        </View>
        <Input
          textLabel="Rent per month"
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <Input
          textLabel="Description"
          multiline
          style={styles.descriptionBox}
          onChangeText={setDescription}
        />
      </View>
      <Button
        text="Submit"
        style={styles.buttonContainer}
        onPress={onSubmit}
        isSubmitting={isSubmitting}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  formContainer: {
    marginTop: 20,
    gap: 12,
  },
  descriptionBox: {
    height: 80,
  },
  buttonContainer: {
    marginTop: 32,
  },
  multiInputContainer: {
    flexDirection: "row",
    gap: 16,
  },
});
