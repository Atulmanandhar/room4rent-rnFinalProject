import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/globalStyles";
import { Entypo } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

type Props = {
  title: string;
  subTitle: string;
  iconName: "mail" | "phone" | "location-pin";
};

const ProfileItem = ({ title, subTitle, iconName }: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Entypo name={iconName} size={24} color={COLORS.black} />
      </View>
      <View style={{ gap: 12 }}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLORS.white,
    ...GlobalStyles.cardShadow,
    paddingLeft: 14,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.black,
  },
});
