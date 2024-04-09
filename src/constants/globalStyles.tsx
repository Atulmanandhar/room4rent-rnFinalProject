import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flexShrink1: {
    flexShrink: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
  },

  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fullWidthAndHeight: {
    height: "100%",
    width: "100%",
  },
  fullWidth: {
    width: "100%",
  },
  fullHeight: {
    height: "100%",
  },
  absolute: {
    position: "absolute",
  },
  paddingH: {
    paddingHorizontal: 16,
  },

  screenPaddingTop: {
    paddingTop: 20,
  },
  screenTitle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 28,
  },
});
