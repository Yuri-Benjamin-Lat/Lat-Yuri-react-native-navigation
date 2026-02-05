import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useTheme } from "../../context/ThemeContext";
import { useCart, CartItem } from "../../context/CartContext";

type Props = NativeStackScreenProps<RootStackParamList, "Checkout">;

export default function Checkout({ navigation }: Props) {
  const { theme } = useTheme();
  const { cartItems, clearCart } = useCart();

  // helper to convert hex to rgba with opacity
  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${opacity})`;
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.receiptRow}>
      {/* Tiny icon next to name */}
      <Image source={item.image} style={styles.itemIcon} resizeMode="contain" />
      <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
      <Text style={[styles.itemQty, { color: theme.text }]}>
        {item.quantity} x ₱ {item.price}
      </Text>
      <Text style={[styles.itemTotal, { color: theme.text }]}>
        ₱ {item.price * item.quantity}
      </Text>
    </View>
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    Alert.alert(
      "Confirm Checkout",
      "Are you sure you want to place this order?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            clearCart();
            Alert.alert("Success", "Checkout successful!", [
              {
                text: "Okay",
                onPress: () =>
                  navigation.reset({ index: 0, routes: [{ name: "Home" }] }),
              },
            ]);
          },
        },
      ]
    );
  };

  return (
    <ImageBackground
      source={require("../../../assets/checkoutbg2.png")}
      style={{ flex: 1, backgroundColor: theme.background }}
      resizeMode="cover"
    >
      <View style={{ flex: 1, padding: 12 }}>
        {cartItems.length === 0 ? (
          <Text style={{ color: theme.text, textAlign: "center", marginTop: 20 }}>
            Your cart is empty
          </Text>
        ) : (
          <View
            style={[
              styles.receiptContainer,
              { backgroundColor: hexToRgba(theme.background, 0.8), borderColor: theme.text },
            ]}
          >
            <FlatList
              data={cartItems}
              keyExtractor={(item, index) => item.id + index.toString()}
              renderItem={renderItem}
              scrollEnabled={false} // no internal scroll
            />
            <View style={styles.receiptTotalRow}>
              <Text style={[styles.totalText, { color: theme.text }]}>Total:</Text>
              <Text style={[styles.totalText, { color: theme.text }]}>₱ {total}</Text>
            </View>
          </View>
        )}
      </View>

      {/* BOTTOM BAR */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: theme.background,
            borderTopColor: theme.text,
            position: "absolute",
            bottom: 0,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.checkoutButton, { backgroundColor: theme.text }]}
          onPress={handleCheckout}
          disabled={cartItems.length === 0}
        >
          <Text style={{ color: theme.background, fontWeight: "bold" }}>
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  receiptContainer: {
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 12,
    margin: 4
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
  itemName: { flex: 2, fontSize: 16 },
  itemQty: { flex: 1, fontSize: 16, textAlign: "center" },
  itemTotal: { flex: 1, fontSize: 16, textAlign: "right" },
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
    bottom: 0,
    width: "100%",
    height: 80,
    padding: 12,
    paddingHorizontal: 32,
    paddingLeft: 40,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  checkoutButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
  },
});
