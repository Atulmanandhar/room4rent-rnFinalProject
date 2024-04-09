import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import COLORS from "../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {};

export type IAmmenities = {
  name: string;
  icon: ReactNode;
};

const AMMENITIES_DATA: IAmmenities[] = [
  {
    name: "Wifi",
    icon: (
      <MaterialCommunityIcons name="wifi" size={18} color={COLORS.primary} />
    ),
  },
  {
    name: "Kitchen",
    icon: (
      <MaterialCommunityIcons
        name="silverware-fork-knife"
        size={18}
        color={COLORS.primary}
      />
    ),
  },
  {
    name: "Bathtub",
    icon: (
      <MaterialCommunityIcons name="bathtub" size={18} color={COLORS.primary} />
    ),
  },
  {
    name: "Hair dryer",
    icon: (
      <MaterialCommunityIcons
        name="hair-dryer"
        size={18}
        color={COLORS.primary}
      />
    ),
  },
  {
    name: "Indoor fireplace",
    icon: (
      <MaterialCommunityIcons
        name="fireplace"
        size={18}
        color={COLORS.primary}
      />
    ),
  },
];

const Ammenities = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ammenities</Text>
      {AMMENITIES_DATA.map((ammenitiesItem, idx) => (
        <View key={`${ammenitiesItem.name}-${idx}`} style={styles.ammenityItem}>
          {ammenitiesItem.icon}
          <Text style={styles.ammenityName}>{ammenitiesItem.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default Ammenities;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    // ...GlobalStyles.cardShadow,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 12,
    marginBottom: 30,
    borderColor: COLORS.gray,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },
  ammenityItem: {
    flexDirection: "row",
    gap: 10,
    paddingBottom: 8,
    alignItems: "center",
  },
  ammenityName: {
    fontSize: 12,
  },
});
