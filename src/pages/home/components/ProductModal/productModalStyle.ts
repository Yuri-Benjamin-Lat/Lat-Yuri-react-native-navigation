import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    borderRadius: 12,
    padding: 20,
    borderWidth: 0.5,
    alignItems: "center",
  },
  image: {
    width: 175,
    height: 175,
    marginVertical: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 16,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    paddingHorizontal: 12,
    paddingVertical: 1,
    borderRadius: 6,
  },
  qtyButtonText: {
    fontSize: 32,
    textAlign: "center",
  },
  qtyText: {
    fontSize: 20,
    marginHorizontal: 16,
    textAlign: "center",
  },
  spacer: {
    width: 32,
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    fontWeight: "600",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    left: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 20,
    textAlign: "center",
  },
});
