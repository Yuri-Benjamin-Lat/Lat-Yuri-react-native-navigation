import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 4,
    padding: 19,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 0.5,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    paddingTop: 8,
  },
  price: {
    fontSize: 14,
    marginTop: 4,
  },
});
