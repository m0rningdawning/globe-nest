import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";

type TopNewsItemProps = {
  item: any;
  handlePress: any;
};

const { width, height } = Dimensions.get("window");

const TopNewsItem: React.FC<TopNewsItemProps> = ({ item, handlePress }) => {
  return (
    <TouchableWithoutFeedback onPress={handlePress(item)}>
      <View style={[styles.container]}>
        <Image source={{ uri: item.urlToImage }} style={styles.image} resizeMode="cover" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  image: {
    width: width * 0.9,
    height: height * 0.5,
    borderRadius: 10,
  },
});

export default TopNewsItem;
