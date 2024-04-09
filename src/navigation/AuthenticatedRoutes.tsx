import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ItemDetailsScreen from "../screens/ItemDetailsScreen";
import SavedRoomsScreen from "../screens/SavedRoomsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../constants/colors";
import AddRoomScreen from "../screens/AddRoomScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getTabBarIcons = ({
  color,
  routeName,
}: {
  color: string;
  routeName: string;
}) => {
  if (routeName === "Home") {
    return <Ionicons color={color} name="home" size={24} />;
  } else if (routeName === "SavedRooms") {
    return <Ionicons color={color} name="heart" size={24} />;
  } else if (routeName === "Profile") {
    return <Ionicons color={color} name="person" size={24} />;
  }
};

const BottomTabBarNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarIcon: ({ color }) =>
          getTabBarIcons({ color, routeName: route.name }),
      })}
    >
      <Tab.Screen name={"Home"} component={HomeScreen} />
      <Tab.Screen name={"SavedRooms"} component={SavedRoomsScreen} />
      <Tab.Screen name={"Profile"} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function AuthenticatedRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === "android" ? "fade" : "default",
        presentation: Platform.OS === "ios" ? "modal" : "card",
      }}
    >
      <Stack.Screen name="BottomTabScreen" component={BottomTabBarNavigation} />
      <Stack.Screen name="ItemDetailsScreen" component={ItemDetailsScreen} />
      <Stack.Screen name="AddRoomScreen" component={AddRoomScreen} />
    </Stack.Navigator>
  );
}
