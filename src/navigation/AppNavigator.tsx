import React from "react";
import { View, Text, StyleSheet, Button, Pressable, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import ThemeToggleButton from "../context/ThemeToggleButton/index";
import { Ionicons } from "@expo/vector-icons";

import Home from "../pages/home/page";
import Cart from "../pages/cart/page";
import Checkout from "../pages/checkout/page";

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
};

const Stack = createNativeStackNavigator<any>();

export default function AppNavigator() {
  const { theme } = useTheme();

  const renderTitle = (title: string) => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={{ color: theme.text, fontSize: 18, fontWeight: "bold" }}>
        {title}{" "}
      </Text>
    </View>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerTitle: () => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <ThemeToggleButton />
                <Text
                  style={{
                    color: theme.text,
                    fontSize: 20,
                    fontWeight: "900",
                    paddingRight: 10,
                  }}
                >
                  Dandy's Trinkets
                </Text>
                <Pressable
                  onPress={() => navigation.navigate("Cart")}
                  style={{ padding: 5 }}
                >
                  <Image
                    source={require("../../assets/cart_icon.png")}
                    style={{ 
                      width: 28,
                      height: 28, 
                      
                    }}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>
            ),

            headerStyle: { backgroundColor: theme.background },
            /* headerTintColor: theme.text, */
          })}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={({ navigation }) => ({
            headerTitle: () => renderTitle("Cart"),
            headerStyle: { backgroundColor: theme.background },
            headerTintColor: theme.text, // arrow color
            headerBackTitleVisible: false, // <-- removes "Home" label
          })}
        />

        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={({ navigation }) => ({
            headerTitle: () => renderTitle("Checkout"),
            headerStyle: { backgroundColor: theme.background },
            headerTintColor: theme.text, // arrow color
            headerBackTitleVisible: false, // <-- removes "Back" label
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}