import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type TopNewsItemProps = {
  item: any;
  handlePress: any;
};

const { width, height } = Dimensions.get("window");

const TopNewsItem: React.FC<TopNewsItemProps> = ({ item, handlePress }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handlePress(item)}>
      <View style={[styles.container]}>
        <Image
          source={{ uri: item.urlToImage }}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(34, 34, 43, 1)"]}
          start={[0, 0.2]}
          end={[0, 0.8]}
          style={[styles.gradient]}
        />
        <View style={[styles.content]}>
          <Text style={[styles.title]}>{item.title}</Text>
        </View>
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
    height: height * 0.27,
    borderRadius: 10,
  },
  gradient: {
    position: "absolute",
    width: width * 0.9,
    height: height * 0.27,
    borderRadius: 10,
  },
  content: {
    position: "absolute",
    bottom: 0,
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontFamily: "Quicksand-Bold",
    color: "#e0a16d",
    textTransform: "uppercase",
  },
  description: {
    fontSize: 13,
    fontFamily: "Quicksand-Regular",
    color: "#e0a16d",
  },
});

export default TopNewsItem;
