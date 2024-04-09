import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WINDOW_WIDTH } from "../../helpers/dimensions";
import { GlobalStyles } from "../../constants/globalStyles";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigationHookProp } from "../../navigation/routeTypes";
import COLORS from "../../constants/colors";

export type IFoodItem = {
  id: string;
  foodName: string;
  rating: number;
  location: string;
  image: string;
  type: string;
  calories: number;
  description: string;
  price: number;
};

type Props = {
  isLarge?: boolean;
  data: IFoodItem;
};

const MenuItemCard = ({ isLarge, data }: Props) => {
  const navigation =
    useNavigation<AuthStackNavigationHookProp<"BottomTabScreen">>();
  const onMenuItemClick = () => {
    navigation.navigate("ItemDetailsScreen", { foodData: data });
  };
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onMenuItemClick}>
      <View
        style={[
          styles.container,
          { width: isLarge ? "100%" : WINDOW_WIDTH * 0.58 },
        ]}
      >
        <View style={[styles.imageContainer, { height: isLarge ? 165 : 130 }]}>
          <Image
            source={{ uri: data?.image }}
            style={GlobalStyles.fullWidthAndHeight}
            resizeMode="cover"
          />
        </View>
        <View style={styles.text1Container}>
          <Text style={styles.title}>{data?.foodName}</Text>
          <View style={styles.ratingContainer}>
            <Text>{data?.rating}</Text>
            <AntDesign name="star" size={16} color={COLORS.yellow} />
          </View>
        </View>
        <Text style={styles.addressText}>{data?.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItemCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    ...GlobalStyles.cardShadow,
    padding: 12,
    marginBottom: 10,
  },
  imageContainer: {
    width: "100%",
  },
  text1Container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.black,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  addressText: {
    fontSize: 12,
    fontWeight: "300",
    color: COLORS.black,
  },
});
