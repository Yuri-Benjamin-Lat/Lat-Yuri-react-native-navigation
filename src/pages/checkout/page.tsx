import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useTheme } from "../../context/ThemeContext";
import { styles } from "./style"; // import styles

type Props = NativeStackScreenProps<RootStackParamList, "Checkout">;

export default function Checkout({ navigation }: Props) {
  const { theme } = useTheme();

  const handlePlaceOrder = () => {
    Alert.alert(
      "Order Placed!",
      "Your order has been successfully placed.",
      [
        {
          text: "OK",
          onPress: () =>
            navigation.reset({ index: 0, routes: [{ name: "Home" }] }),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text, fontSize: 20 }}>Checkout Page</Text>

      <View
        style={[
          styles.bottomBar,
          { backgroundColor: theme.background, borderTopColor: theme.text },
        ]}
      >
        <TouchableOpacity
          style={[styles.placeOrderButton, { backgroundColor: theme.text }]}
          onPress={handlePlaceOrder}
        >
          <Text style={{ color: theme.background, fontWeight: "bold" }}>
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
