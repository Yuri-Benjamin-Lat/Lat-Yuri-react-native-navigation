import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import ThemeToggleButton from "../context/ThemeToggleButton/index";
import { Ionicons } from "@expo/vector-icons";

import Home from "../pages/home/page";
import Cart from "../pages/cart/page";
import Checkout from "../pages/checkout/page";
import { styles } from "./AppNavigatorStyle";

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
};

const Stack = createNativeStackNavigator<any>();

export default function AppNavigator() {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerTitle: () => (
              <View style={styles.homeHeaderContainer}>
                <ThemeToggleButton />
                <Text style={[styles.homeHeaderText, { color: theme.text }]}>
                  Dandy's Trinkets
                </Text>
                <Pressable
                  onPress={() => navigation.navigate("Cart")}
                  style={styles.cartButton}
                >
                  <Image
                    source={require("../../assets/cart_icon.png")}
                    style={styles.cartIcon}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>
            ),
            headerStyle: { backgroundColor: theme.background },
          })}
        />

        {/* Cart Screen */}
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={({ navigation }) => ({
            headerLeft: () => null,
            headerBackVisible: false,
            headerTitle: () => (
              <View style={styles.centerHeaderContainer}>
                <Pressable
                  style={styles.backButtonContainer}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="arrow-back" size={24} color={theme.text} />
                </Pressable>
                <Text style={[styles.centerHeaderText, { color: theme.text }]}>
                  Shopping Cart
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: theme.background },
            headerTintColor: theme.text,
          })}
        />

        {/* Checkout Screen */}
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={({ navigation }) => ({
            headerLeft: () => null,
            headerBackVisible: false,
            headerTitle: () => (
              <View style={styles.centerHeaderContainer}>
                <Pressable
                  style={styles.backButtonContainer}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="arrow-back" size={24} color={theme.text} />
                </Pressable>
                <Text style={[styles.centerHeaderText, { color: theme.text }]}>
                  Order Summary
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: theme.background },
            headerTintColor: theme.text,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
