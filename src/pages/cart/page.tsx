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
import { styles, getBackgroundStyle } from "./style";

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

  const renderItem = ({ item }: { item: CartItem }) => (
    <View
      style={[
        styles.itemContainer,
        {
          borderColor: theme.text,
          backgroundColor: hexToRgba(theme.background, 0.8),
        },
      ]}
    >
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.price, { color: theme.text, paddingBottom: 8 }]}>
          ₱ {item.price} x {item.quantity} = ₱ {item.price * item.quantity}
        </Text>

        <View style={styles.rowBetween}>
          <View style={styles.quantityContainer}>
            <Pressable
              style={[styles.qtyButton, { backgroundColor: theme.text }]}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Text style={{ color: theme.background }}>-</Text>
            </Pressable>

            <Text
              style={[
                styles.qtyText,
                { color: theme.text, paddingLeft: 18, paddingRight: 24 },
              ]}
            >
              {item.quantity}
            </Text>

            <Pressable
              style={[styles.qtyButton, { backgroundColor: theme.text }]}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Text style={{ color: theme.background }}>+</Text>
            </Pressable>
          </View>

          <Pressable
            style={[styles.removeButton, { backgroundColor: theme.accent, marginRight: 12 }]}
            onPress={() => removeFromCart(item.id)}
          >
            <Text style={{ color: theme.background }}>Remove</Text>
          </Pressable>
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
      style={getBackgroundStyle(theme.background)}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {cartItems.length === 0 ? (
          <Text
            style={[
              styles.generalText,
              {
                backgroundColor: hexToRgba(theme.background, 0.8),
                borderColor: theme.text,
                color: theme.text,
              },
            ]}
          >
            Your cart is empty
          </Text>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => item.id + index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContent}
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
          },
        ]}
      >
        <Text style={[styles.total, { color: theme.text }]}>{`Total: ₱ ${total}`}</Text>

        <Pressable
          style={[styles.checkoutButton, { backgroundColor: theme.accent }]}
          onPress={() => {
            if (cartItems.length === 0) {
              Alert.alert("Oops!", "Can't check out an empty cart");
              return;
            }
            navigation.navigate("Checkout");
          }}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
