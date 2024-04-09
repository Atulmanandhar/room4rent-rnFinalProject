import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import COLORS from "../../constants/colors";

type Props = {
  text?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
  isSubmitting?: boolean;
  disabled?: boolean;
};

const Button = ({
  text,
  style = {},
  textStyle = {},
  onPress = () => {},
  isSubmitting = false,
  disabled = false,
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { opacity: disabled ? 0.25 : 1 }, style]}
      onPress={onPress}
      disabled={isSubmitting || disabled}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
      {isSubmitting && <ActivityIndicator size={"small"} />}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: "#E6E3FF",
    paddingVertical: 18,
    paddingHorizontal: 4,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  text: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },
});
