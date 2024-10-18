import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const CarouserComp = () => {
  const slides = [
    require("../assets/images/image1.jpg"),
    require("../assets/images/image2.jpg"),
    require("../assets/images/image.jpg"),
  ];
  const renderItem = ({ item }: any) => {
    // console.log(item);
    return (
      <View style={styles.carouselItem}>
        <Image source={item} style={styles.carouselImage} />
      </View>
    );
  };
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        data={slides}
        renderItem={renderItem}
        loop
        width={350}
        height={180}
        // autoPlay={true}
      />
    </View>
  );
};

export default CarouserComp;

const styles = StyleSheet.create({
  carouselContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  carouselItem: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
  },
  carouselImage: {
    
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
