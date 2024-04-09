import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import { StatusBar } from "expo-status-bar";
import UnAuthenticatedRoutes from "./UnAuthenticatedRoutes";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import Loader from "../components/Loader/Loader";

type Props = {};

const Routes = (props: Props) => {
  const [isLoggedinUser, setIsLoggedInUser] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setIsCheckingStatus(true);
      if (user) {
        // const uid = user.uid;
        setIsLoggedInUser(true);
      } else {
        setIsLoggedInUser(false);
      }
      setIsCheckingStatus(false);
    });
  }, []);

  if (isCheckingStatus) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <SafeAreaProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 20}
        >
          {isLoggedinUser ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
