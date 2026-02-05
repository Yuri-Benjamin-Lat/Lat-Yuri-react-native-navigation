import React, { useState } from "react";
import { Modal, View, Text, Image, Pressable } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { useCart } from "../../../context/CartContext";
import { styles } from "./productModalStyle";

type ProductModalProps = {
  visible: boolean;
  onClose: () => void;
  id: string;
  name: string;
  price: number;
  description: string;
  image: any;
};

export default function ProductModal({
  visible,
  onClose,
  id,
  name,
  price,
  description,
  image,
}: ProductModalProps) {
  const { theme } = useTheme();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ id, name, price, image }, quantity);
    onClose(); // close modal after adding
    setQuantity(1); // reset quantity
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: theme.background, borderColor: theme.text },
          ]}
        >
          {/* Close Button */}
          <Pressable
            style={[styles.closeButton, { backgroundColor: theme.text }]}
            onPress={onClose}
          >
            <Text style={[styles.closeButtonText, { color: theme.background }]}>
              x
            </Text>
          </Pressable>

          <Image source={image} style={styles.image} resizeMode="contain" />
          <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
          <Text style={[styles.price, { color: theme.text }]}>₱ {price}</Text>
          <Text style={[styles.description, { color: theme.text }]}>
            {description}
          </Text>

          {/* Quantity + Add to Cart */}
          <View style={styles.rowContainer}>
            <View style={styles.quantityContainer}>
              <Pressable
                style={[styles.qtyButton, { backgroundColor: theme.text }]}
                onPress={() => setQuantity(q => Math.max(1, q - 1))}
              >
                <Text style={[styles.qtyButtonText, { color: theme.background }]}>-</Text>
              </Pressable>

              <Text style={[styles.qtyText, { color: theme.text }]}>{quantity}</Text>

              <Pressable
                style={[styles.qtyButton, { backgroundColor: theme.text }]}
                onPress={() => setQuantity(q => q + 1)}
              >
                <Text style={[styles.qtyButtonText, { color: theme.background }]}>+</Text>
              </Pressable>
            </View>

            <View style={styles.spacer} />

            <Pressable
              style={[styles.addButton, { backgroundColor: theme.accent }]}
              onPress={handleAddToCart}
            >
              <Text style={[styles.addButtonText, { color: theme.background }]}>
                Add to Cart
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
