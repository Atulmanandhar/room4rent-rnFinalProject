import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SafeAreaWrapper from "../components/SafeAreaWrapper/SafeAreaWrapper";
import COLORS from "../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AvailableProperties from "./HomeScreenTabs/AvailableProperties";
import MyProperties from "./HomeScreenTabs/MyProperties";

const Tab = createMaterialTopTabNavigator();

const HomeScreen = ({ navigation }) => {
  const onFloatingButtonPress = () => {
    navigation.navigate("AddRoomScreen");
  };
  return (
    <SafeAreaWrapper>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.tabbarLabel,
          tabBarActiveTintColor: COLORS.primary,
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      >
        <Tab.Screen
          name="AvailabelProperties"
          component={AvailableProperties}
          options={{
            tabBarLabel: "Available Properties",
          }}
        />
        <Tab.Screen
          name="MyProperties"
          component={MyProperties}
          options={{
            tabBarLabel: "My Properties",
          }}
        />
      </Tab.Navigator>
      <View style={styles.floatingContainer}>
        <TouchableOpacity onPress={onFloatingButtonPress}>
          <Ionicons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "white",
  },
  largeMenuCards: {
    marginTop: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 8,
  },
  floatingContainer: {
    position: "absolute",
    backgroundColor: COLORS.primary,
    height: 50,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 45,
    bottom: 16,
    right: 16,
  },
  spacer: {
    height: 16,
  },
  tabbarLabel: {
    textTransform: "capitalize",
    fontSize: 14,
    fontWeight: "700",
  },
});
