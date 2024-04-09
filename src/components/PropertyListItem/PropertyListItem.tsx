import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/globalStyles";
import { IProperty } from "../../interface";
import { useNavigation } from "@react-navigation/native";

type Props = {
  propertyData?: IProperty;
  isFromSaveScreen?: boolean;
};

const PropertyListItem = ({
  propertyData,
  isFromSaveScreen = false,
}: Props) => {
  const navigation = useNavigation();
  const { name = "", imageUrl = "", price = "", location = "" } = propertyData;

  const onPress = () => {
    if (isFromSaveScreen) {
      //@ts-ignore
      navigation.navigate("ItemDetailsScreen", {
        propertyData,
        isFromSaveScreen,
      });
    } else {
      //@ts-ignore
      navigation.navigate("ItemDetailsScreen", { propertyData });
    }
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={GlobalStyles.fullWidthAndHeight}
          />
          <View style={styles.darkOverlay} />
          <View style={styles.textContainer}>
            <Text style={styles.nameText} numberOfLines={1}>
              {name}
            </Text>
            <View style={styles.secondaryTextContainer}>
              <Text style={styles.locationText} numberOfLines={1}>
                {location}
              </Text>
              <Text style={styles.locationText} numberOfLines={1}>
                {price} CAD
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PropertyListItem;

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.cardShadow,
    backgroundColor: "white",
    borderRadius: 8,
  },
  imageContainer: {
    height: 150,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  textContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 4,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "800",
    color: "white",
  },
  locationText: {
    fontSize: 12,
    color: "white",
  },
  secondaryTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  darkOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.36)",
    zIndex: 10,
  },
});
