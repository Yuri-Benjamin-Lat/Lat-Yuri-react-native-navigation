import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  Alert,
  Pressable,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useTheme } from "../../context/ThemeContext";
import { useCart, CartItem } from "../../context/CartContext";
import { styles } from "./style";

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
      source={require("../../../assets/background3.png")}
      style={[styles.background, { backgroundColor: theme.background }]}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {cartItems.length === 0 ? (
          <Text style={[styles.emptyText, { color: theme.text }]}></Text>
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
              scrollEnabled={false}
            />
            <View style={styles.receiptTotalRow}>
              <Text style={[styles.totalText, { color: theme.accent }]}>Total:</Text>
              <Text style={[styles.totalText, { color: theme.accent }]}>₱ {total}</Text>
            </View>
          </View>
        )}
      </View>

      {/* BOTTOM BAR */}
      <View
        style={[
          styles.bottomBar,
          { backgroundColor: theme.background, borderTopColor: theme.text },
        ]}
      >
        <Pressable
          style={[styles.checkoutButton, { backgroundColor: theme.accent }]}
          onPress={handleCheckout}
          disabled={cartItems.length === 0}
        >
          <Text style={[styles.checkoutButtonText, { color: theme.background }]}>
            Place Order
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
