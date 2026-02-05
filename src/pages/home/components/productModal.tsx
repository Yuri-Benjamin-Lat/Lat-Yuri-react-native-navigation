import React, { useState } from "react";
import { Modal, View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { useCart } from "../../../context/CartContext";

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
            <Text
              style={{
                color: theme.background,
                fontWeight: "600",
                fontSize: 20,
                lineHeight: 20, // makes the text perfectly vertically centered
                textAlign: "center",
              }}
            >
              x
            </Text>
          </Pressable>

          <Image source={image} style={styles.image} resizeMode="contain" />
          <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
          <Text style={[styles.price, { color: theme.text }]}>₱ {price}</Text>
          <Text style={[styles.description, { color: theme.text }]}>
            {description}
          </Text>

          {/* Quantity + Add to Cart in one line, centered */}
          <View style={styles.rowContainer}>
            {/* Quantity Selector */}
            <View style={styles.quantityContainer}>
              <Pressable
                style={styles.qtyButton}
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Text style={{ color: "#fff" }}>-</Text>
              </Pressable>
              <Text style={[styles.qtyText, { color: theme.text }]}>{quantity}</Text>
              <Pressable
                style={styles.qtyButton}
                onPress={() => setQuantity((q) => q + 1)}
              >
                <Text style={{ color: "#fff" }}>+</Text>
              </Pressable>
            </View>

            {/* Add some space between quantity and button */}
            <View style={{ width: 32 }} />

            {/* Add to Cart Button */}
            <Pressable
              style={[styles.addButton, { backgroundColor: theme.text }]}
              onPress={handleAddToCart}
            >
              <Text style={{ color: theme.background, fontWeight: "600" }}>
                Add to Cart
              </Text>
            </Pressable>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    borderRadius: 12,
    padding: 20,
    borderWidth: 0.5,
    alignItems: "center",
  },
  image: {
    width: 175,
    height: 175,
    marginVertical: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  price: { fontSize: 18, marginBottom: 8 },
  description: { fontSize: 14, textAlign: "center", marginVertical: 16, marginBottom: 24 },

  // Row for quantity + add to cart
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // CENTER everything
    marginBottom: 16,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  qtyText: { fontSize: 16, marginHorizontal: 12 },

  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    left: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});
