import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import COLORS from "../../constants/colors";

type Props = {
  style?: ViewStyle;
};

const Loader = ({ style = {} }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={"large"} color={COLORS.primary} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
