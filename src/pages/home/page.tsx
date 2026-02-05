import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator"; 
import { useTheme } from "../../context/ThemeContext";
import { styles } from "./style"; // import the styles

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  const { theme } = useTheme();

  return (
    <ImageBackground
      source={require("../../../assets/background3.png")}
      style={[styles.container, { backgroundColor: theme.background }]}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={{ color: theme.text, fontSize: 20 }}>Home Page</Text>
      </View>
    </ImageBackground>
  );
}
