import React from "react";
import { TouchableOpacity, Text, Image, Pressable } from "react-native";
import { useTheme } from "../ThemeContext";
import { styles } from "./style";

export default function ThemeToggleButton() {
  const { toggleTheme, isDark, theme } = useTheme();

  return (
    <Pressable
      style={[styles.button ]}
      onPress={toggleTheme}
    >
      <Image
        source={
          isDark
            ? require("../../../assets/light.webp")
            : require("../../../assets/dark.webp")
        }
        style={styles.icon}
        resizeMode="contain"
        tintColor={undefined}
      />
    </Pressable>
  );
}
