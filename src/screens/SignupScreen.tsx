import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Input from "../components/Input/Input";
import { GlobalStyles } from "../constants/globalStyles";
import Button from "../components/Button/Button";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import COLORS from "../constants/colors";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { db, USER_COLLECTION_TITLE } from "../config/firebaseConfig";

const SignUpScreen = ({ navigation }) => {
  const userCollectionRef = collection(db, USER_COLLECTION_TITLE);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveUserToFirebase = async (userUID: string, createdAt: string) => {
    try {
      const docRef = doc(userCollectionRef, userUID);
      await setDoc(docRef, {
        name,
        email,
        address,
        createdAt,
        phone,
      });
    } catch (err) {
      setIsSubmitting(false);
      Alert.alert("Firestore Error", `Error: ${err?.message}`);
      console.log(err);
    }
  };

  const onSignupBtnPress = async () => {
    if (!email || !password || !name || !address || !phone) {
      Alert.alert("Missing Data", "Please fill out all the fields");
      return;
    }
    try {
      setIsSubmitting(true);
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userUID = userCredentials.user.uid;
      const createdAt = userCredentials.user.metadata.creationTime;
      await saveUserToFirebase(userUID, createdAt);
    } catch (err) {
      setIsSubmitting(false);
      Alert.alert("Signup Error", `Error: ${err?.message}`);
    }
  };

  const onBackToLoginPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/adaptive-icon.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.loginCard}>
        <Text style={styles.title}>Signup</Text>
        <Input
          textLabel="Name"
          style={styles.textInput}
          onChangeText={setName}
          placeholder="John Doe"
        />
        <Input
          textLabel="Email"
          style={styles.textInput}
          onChangeText={setEmail}
          autoCapitalize="none"
          placeholder="final@gmail.com"
        />
        <Input
          textLabel="Phone"
          style={styles.textInput}
          onChangeText={setPhone}
          autoCapitalize="none"
          placeholder="+1-xxx-xxx-xxxx"
        />
        <Input
          textLabel="Password"
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={setPassword}
          placeholder="123456"
        />
        <Input
          textLabel="Address"
          style={styles.textInput}
          onChangeText={setAddress}
          placeholder="Fanshawe Blvd"
          returnKeyType="go"
          onSubmitEditing={onSignupBtnPress}
        />
        <Button
          text="Sign up"
          onPress={onSignupBtnPress}
          isSubmitting={isSubmitting}
        />
        <TouchableOpacity onPress={onBackToLoginPress}>
          <Text style={styles.backToLogin}>Go back to Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...GlobalStyles.paddingH,
    justifyContent: "center",
    backgroundColor: "white",
  },
  imageContainer: {
    height: 200,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  loginCard: {
    ...GlobalStyles.cardShadow,
    ...GlobalStyles.paddingH,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingTop: 18,
    paddingBottom: 32,
  },
  title: {
    marginBottom: 17,
    fontSize: 20,
    color: "black",
  },
  textInput: {
    marginBottom: 8,
  },
  backToLogin: {
    alignSelf: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 12,
  },
});
