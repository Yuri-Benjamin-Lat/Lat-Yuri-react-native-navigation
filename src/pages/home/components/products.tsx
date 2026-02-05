import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { styles } from "./productsStyle";

type ProductCardProps = {
  name: string;
  price: number;
  image: any;
  backgroundOpacity?: number; // optional prop to configure opacity (0 to 1)
  onPress?: () => void;       // <-- added for modal click
};

export default function ProductCard({
  name,
  price,
  image,
  backgroundOpacity = 0.85,
  onPress,
}: ProductCardProps) {
  const { theme } = useTheme();

  // convert theme.background hex to rgba with opacity
  const getBackgroundWithOpacity = (hexColor: string, opacity: number) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${opacity})`;
  };

  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: getBackgroundWithOpacity(theme.background, backgroundOpacity),
          borderColor: theme.text,
        },
      ]}
      onPress={onPress} // <-- open modal when pressed
    >
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
        {name}
      </Text>
      <Text style={[styles.price, { color: theme.text }]}>{`₱ ${price}`}</Text>
    </Pressable>
  );
}
