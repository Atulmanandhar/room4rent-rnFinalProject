import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import COLORS from "../../constants/colors";

interface Props extends TextInputProps {
  textLabel?: string;
  containerStyle?: ViewStyle;
}

const Input = ({ textLabel, style, containerStyle, ...props }: Props) => {
  return (
    <View style={[styles.textInputContainer, containerStyle]}>
      {textLabel && <Text style={styles.textLabel}>{textLabel}</Text>}
      <TextInput style={[styles.textInput, style]} {...props} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  textLabel: {
    marginBottom: 7,
    fontSize: 14,
    color: COLORS.black,
  },
  textInputContainer: {
    width: "auto",
    // padding: 16,
  },
  textInput: {
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
  },
});
