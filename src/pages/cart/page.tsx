import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useTheme } from "../../context/ThemeContext";
import { styles } from "./style";

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

export default function Cart({ navigation }: Props) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text, fontSize: 20 }}>Cart Page</Text>

      <View
        style={[
          styles.bottomBar,
          { backgroundColor: theme.background, borderTopColor: theme.text },
        ]}
      >
        <TouchableOpacity
          style={[styles.checkoutButton, { backgroundColor: theme.text }]}
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text style={{ color: theme.background, fontWeight: "bold" }}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
