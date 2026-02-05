import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const getBackgroundStyle = (bgColor: string) => ({
  flex: 1,
  backgroundColor: bgColor,
});

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 6 },
  flatListContent: { paddingBottom: 100 },
  generalText: {
    fontSize: 16,
    marginHorizontal: 90,
    padding: 20,
    borderWidth: 0.5,
    borderRadius: 8,
    textAlign: "center",
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: "row",
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 12,
    marginBottom: 4,
    alignItems: "center",
    margin: 4,
  },
  image: { width: 80, height: 80, marginLeft: 8, marginRight: 20 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600" },
  price: { fontSize: 14, marginVertical: 6 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  quantityContainer: { flexDirection: "row", alignItems: "center", flexWrap: "nowrap" },
  qtyButton: { borderWidth: 0.5, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginRight: 6 },
  qtyText: { fontSize: 16 },
  removeButton: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  bottomBar: {
    bottom: 0,
    width: "100%",
    height: 80,
    padding: 12,
    paddingHorizontal: 32,
    paddingLeft: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
  },
  total: { fontSize: 16, fontWeight: "600" },
  checkoutButton: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 6 },
  checkoutText: { color: "#fff", fontWeight: "bold" },

  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.8,
    padding: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  modalMessage: { fontSize: 16, marginBottom: 16, textAlign: "center" },
  modalButton: { paddingVertical: 10, paddingHorizontal: 24, borderRadius: 6 },
  modalButtonText: { fontWeight: "bold" },
});
