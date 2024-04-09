import { StyleSheet, View } from "react-native";
import React from "react";

const ItemSeperatorComponent = () => {
  return <View style={styles.spacer} />;
};

export default ItemSeperatorComponent;

const styles = StyleSheet.create({
  spacer: {
    height: 16,
  },
});
