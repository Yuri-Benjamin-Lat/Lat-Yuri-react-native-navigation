import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* Home Header */
  homeHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  homeHeaderText: {
    fontSize: 20,
    fontWeight: "900",
    paddingRight: 10,
  },
  cartButton: {
    padding: 5,
  },
  cartIcon: {
    width: 28,
    height: 28,
  },

  /* Centered Header for Cart & Checkout */
  centerHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonContainer: {
    position: "absolute",
    left: 0,
    paddingLeft: 12,
    height: "100%",
    justifyContent: "center",
  },
  centerHeaderText: {
    fontSize: 20,
    fontWeight: "900",
  },
});
