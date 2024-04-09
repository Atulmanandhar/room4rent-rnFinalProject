import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import Input from "../components/Input/Input";
import { GlobalStyles } from "../constants/globalStyles";
import Button from "../components/Button/Button";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import COLORS from "../constants/colors";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginBtnPress = async () => {
    const auth = getAuth();
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.log(err?.message);
      Alert.alert("Login Error", `Error: ${err?.message} `);
    }
  };

  const onSignUpBtnPress = () => {
    navigation.navigate("SignupScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/icon.png")} style={styles.image} />
      </View>
      <View style={styles.loginCard}>
        <Text style={styles.title}>Login</Text>
        <Input
          textLabel="Email"
          style={styles.textInput}
          onChangeText={setEmail}
          autoCapitalize="none"
          placeholder="final@gmail.com"
        />
        <Input
          textLabel="Password"
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={setPassword}
          placeholder="123456"
          onSubmitEditing={onLoginBtnPress}
          returnKeyType="go"
        />
        <Button text="Login" onPress={onLoginBtnPress} />
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={onSignUpBtnPress}>
            <Text style={[styles.signupText, styles.signupBtnText]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

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
    marginBottom: 22,
  },
  signupContainer: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    marginTop: 12,
  },
  signupText: {
    fontSize: 12,
    color: COLORS.black,
  },
  signupBtnText: {
    fontWeight: "bold",
    color: COLORS.primary,
  },
});
