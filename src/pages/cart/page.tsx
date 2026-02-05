import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useTheme } from "../../context/ThemeContext";
import { useCart, CartItem } from "../../context/CartContext";

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

export default function Cart({ navigation }: Props) {
  const { theme } = useTheme();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // helper to convert hex to rgba with opacity
  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${opacity})`;
  };

  const renderItem = ({ item, index }: { item: CartItem; index: number }) => (
    <View
      style={[
        styles.itemContainer,
        {
          borderColor: theme.text,
          backgroundColor: hexToRgba(theme.background, 0.8), // <-- background opacity applied
        },
      ]}
    >
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.price, { color: theme.text, paddingBottom: 8 }]}>
          ₱ {item.price} x {item.quantity} = ₱ {item.price * item.quantity}
        </Text>

        {/* Row for quantity + remove button */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Quantity controls */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={[styles.qtyButton, { backgroundColor: theme.text }]}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Text style={{ color: theme.background }}>-</Text>
            </TouchableOpacity>
            <Text
              style={[
                styles.qtyText,
                { color: theme.text, paddingLeft: 6, paddingRight: 12 },
              ]}
            >
              {item.quantity}
            </Text>
            <TouchableOpacity
              style={[styles.qtyButton, { backgroundColor: theme.text }]}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Text style={{ color: theme.background }}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Remove button on the right */}
          <TouchableOpacity
            style={[styles.removeButton, { backgroundColor: theme.text, marginRight: 12 }]}
            onPress={() => removeFromCart(item.id)}
          >
            <Text style={{ color: theme.background }}>Remove</Text>
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
    <ImageBackground
      source={require("../../../assets/cartbg.png")}
      style={{ flex: 1, backgroundColor: theme.background }}
      resizeMode="cover"
    >
      {/* SCROLLABLE AREA */}
      <View style={{ flex: 1, padding: 6 }}>
        {cartItems.length === 0 ? (
          <Text style={[styles.generalText, { backgroundColor: theme.background, borderColor: theme.text, color: theme.text, textAlign: "center", marginTop: 20 }]}>
            Your cart is empty
          </Text>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => item.id + index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }} // prevents last item being hidden
          />
        )}
      </View>

      {/* BOTTOM BAR FIXED */}
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
        <Text style={[styles.total, { color: theme.text, fontSize: 20 }]}>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  generalText: {
    fontSize: 16,
    marginHorizontal: 100,
    padding: 12,
    borderWidth: 0.5,
    borderRadius: 8,
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
  image: {
    width: 80,
    height: 80,
    marginLeft: 8,
    marginRight: 20,
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
    flexWrap: "nowrap",
  },
  qtyButton: {
    borderWidth: 0.5,
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
    borderWidth: 0.5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
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
  },
  total: {
    fontSize: 16,
    fontWeight: "600",
  },
  checkoutButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
  },
});
