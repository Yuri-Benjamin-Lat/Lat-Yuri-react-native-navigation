import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useTheme } from "../../context/ThemeContext";
import { useCart, CartItem } from "../../context/CartContext";

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

export default function Cart({ navigation }: Props) {
  const { theme } = useTheme();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const renderItem = ({ item, index }: { item: CartItem; index: number }) => (
    <View style={[styles.itemContainer, { borderColor: theme.text }]}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.price, { color: theme.text }]}>
          ₱ {item.price} x {item.quantity} = ₱ {item.price * item.quantity}
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.qtyButton, { borderColor: theme.text }]}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Text style={{ color: theme.text }}>-</Text>
          </TouchableOpacity>
          <Text style={[styles.qtyText, { color: theme.text }]}>
            {item.quantity}
          </Text>
          <TouchableOpacity
            style={[styles.qtyButton, { borderColor: theme.text }]}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Text style={{ color: theme.text }}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.removeButton, { borderColor: theme.text }]}
            onPress={() => removeFromCart(item.id)}
          >
            <Text style={{ color: theme.text }}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Cart Page</Text>

      {cartItems.length === 0 ? (
        <Text style={{ color: theme.text, textAlign: "center", marginTop: 20 }}>
          Your cart is empty
        </Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => item.id + index.toString()} // <- fixed unique key
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <View
        style={[
          styles.bottomBar,
          { backgroundColor: theme.background, borderTopColor: theme.text },
        ]}
      >
        <Text style={[styles.total, { color: theme.text }]}>
          Total: ₱ {total}
        </Text>
        <TouchableOpacity
          style={[styles.checkoutButton, { backgroundColor: theme.text }]}
          onPress={() => navigation.navigate("Checkout")}
          disabled={cartItems.length === 0}
        >
          <Text style={{ color: theme.background, fontWeight: "bold" }}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    fontSize: 14,
    marginVertical: 6,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  qtyButton: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 6,
  },
  qtyText: {
    fontSize: 16,
    marginHorizontal: 6,
  },
  removeButton: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: 0.5,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    fontSize: 16,
    fontWeight: "600",
  },
  checkoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
});
