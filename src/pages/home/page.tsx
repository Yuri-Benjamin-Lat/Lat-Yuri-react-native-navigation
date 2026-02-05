import React, { useState } from "react";
import { View, FlatList, ImageBackground } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useTheme } from "../../context/ThemeContext";
import { products } from "../../shopData";
import ProductCard from "./components/products";
import ProductModal from "./components/productModal";
import { styles } from "./style";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <ImageBackground
      source={require("../../../assets/background3.png")}
      style={[styles.container, { backgroundColor: theme.background }]}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => (
            <ProductCard
              name={item.name}
              price={item.price}
              image={item.image}
              onPress={() => openModal(item)}
            />
          )}
        />
      </View>

      {selectedProduct && (
        <ProductModal
          visible={modalVisible}
          onClose={closeModal}
          id={selectedProduct.id}
          name={selectedProduct.name}
          price={selectedProduct.price}
          description={selectedProduct.description}
          image={selectedProduct.image}
        />
      )}
    </ImageBackground>
  );
}
