import {
  View,
  Text,
  StyleSheet,
  Touchable,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import { FlatList, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

type RecommendedNewsProps = {
  label: string;
  data: any;
};

const { width } = Dimensions.get("window");

const RecommendedNews: React.FC<RecommendedNewsProps> = ({ label, data }) => {
  const navigation = useNavigation();

  const onPress = (item) => {
    // @ts-expect-error ts(2345)
    navigation.navigate("Details", item);
  };

  const validData = data.filter(
    (item) => item.title && item.title !== "[removed]" && item.urlToImage
  );

  const renderItem: React.FC<{
    item: any;
    id: any;
  }> = ({ item, id }) => {
    const date = new Date(item.publishedAt);

    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "short",
      hour: "numeric",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return (
      <TouchableOpacity
        style={styles.item}
        key={id}
        onPress={() => onPress(item)}
      >
        <View style={styles.item}>
          <Image source={{ uri: item.urlToImage }} style={styles.image} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>
            {item?.title?.length > 65
              ? item?.title?.slice(0, 65) + "..."
              : item?.title}
          </Text>
          <Text style={styles.source}>
            {item.author ? item.author + ", " : ""}{item.source.name? item.source.name : ""}
          </Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <FlatList
          nestedScrollEnabled={true}
          data={validData}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, id) => id.toString()}
          // @ts-ignore
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    backgroundColor: "#323241",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  item: {
    flex: 0.3,
    flexDirection: "row",
    width: width * 0.9,
    borderRadius: 5,
    marginVertical: 5,
  },
  image: {
    width: hp(11),
    height: hp(10),
    borderRadius: 5,
  },
  content: {
    flex: 0.7,
  },
  title: {
    fontSize: 13,
    fontFamily: "Quicksand-Bold",
    color: "#e0a16d",
    paddingVertical: 5,
  },
  source: {
    fontSize: 12,
    fontFamily: "Quicksand-Regular",
    color: "#e0a16d",
    paddingTop: 3,
  },
  date: {
    fontSize: 12,
    fontFamily: "Quicksand-Regular",
    color: "#e0a16d",
  },
});

export default RecommendedNews;
