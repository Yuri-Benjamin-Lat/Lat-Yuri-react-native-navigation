import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 12,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },
  receiptContainer: {
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 12,
    margin: 4,
  },
  receiptRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 0.3,
    borderColor: "#aaa",
  },
  itemIcon: {
    width: 24,
    height: 24,
    marginRight: 6,
    alignSelf: "center",
  },
  itemName: {
    flex: 2,
    fontSize: 16,
  },
  itemQty: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  itemTotal: {
    flex: 1,
    fontSize: 16,
    textAlign: "right",
  },
  receiptTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderColor: "#aaa",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "600",
  },
  bottomBar: {
    width: "100%",
    height: 80,
    paddingVertical: 12,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  checkoutButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
  },
  checkoutButtonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
