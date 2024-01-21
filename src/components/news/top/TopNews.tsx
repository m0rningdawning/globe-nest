import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import TopNewsItem from "./TopNewsItem";

type TopNewsProps = {
  label: string;
  data: any;
};

const { width } = Dimensions.get("window");

const TopNews: React.FC<TopNewsProps> = ({ label, data }) => {
  const navigation = useNavigation();

  const validData = data.filter(
    (item) => item.title && item.title !== "[removed]" && item.urlToImage
  );

  const handlePress = (article: any) => {
    // @ts-expect-error ts(2345)
    navigation.navigate("Details", article);
  };

  // console.log(data);

  return (
    <View>
      {/* @ts-ignore */}
      <Carousel
        data={validData}
        renderItem={({ item }) => (
          <View>
            <TopNewsItem item={item} handlePress={handlePress} />
          </View>
        )}
        firstItem={1}
        sliderWidth={width}
        itemWidth={width * 0.8}
        inactiveSlideScale={0.71}
        inactiveSlideOpacity={0.65}
        slideStyle={[styles.carousel]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
  },
  label: {
    fontSize: 15,
    fontFamily: "Quicksand-Medium",
    color: "#e0a16d",
    textTransform: "uppercase",
    marginVertical: 10,
  },
  more: {
    fontSize: 15,
    fontFamily: "Quicksand-Regular",
    color: "#e0a16d",
    marginVertical: 10,
  },
  carousel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TopNews;
