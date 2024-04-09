import { Platform } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignupScreen";

const Stack = createNativeStackNavigator();

const UnAuthenticatedRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === "android" ? "fade" : "default",
      }}
    >
      <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
      <Stack.Screen name={"SignupScreen"} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default UnAuthenticatedRoutes;
