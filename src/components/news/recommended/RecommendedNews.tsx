import {
  View,
  Text,
  StyleSheet,
  Touchable,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import { FlatList, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

type RecommendedNewsProps = {
  label: string;
  data?: any;
  bookmarkedOnly?: boolean;
  bookmarkedData?: any[];
  setBookmarkedData?: (data: any[]) => void;
};

const { width } = Dimensions.get("window");

const RecommendedNews: React.FC<RecommendedNewsProps> = ({
  label,
  data,
  bookmarkedOnly,
  bookmarkedData,
  setBookmarkedData,
}) => {
  const navigation = useNavigation();
  const [bookmarkStat, setBookmarkStat] = useState([]);

  const onPress = (item) => {
    // @ts-expect-error ts(2345)
    navigation.navigate("Details", item);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (bookmarkedOnly) {
        const loadBookmarks = async () => {
          try {
            const savedBookmarks = await AsyncStorage.getItem("savedBookmarks");
            if (savedBookmarks !== null) {
              const bookmarks = JSON.parse(savedBookmarks);
              setBookmarkedData(bookmarks);
            }
          } catch (error) {
            console.log("Loading bookmarks error: " + error);
          }
        };

        loadBookmarks();
      }
    }, [bookmarkedOnly])
  );

  const validData = (bookmarkedOnly ? bookmarkedData : data).filter((item) => {
    const isValid = item.title && item.title !== "[removed]" && item.urlToImage;

    return bookmarkedOnly ? isValid && bookmarkStat[item.url] : isValid;
  });

  const toggleBookmark = async (item, id) => {
    try {
      const savedBookmars = await AsyncStorage.getItem("savedBookmarks");
      let bookmarks = savedBookmars ? JSON.parse(savedBookmars) : [];

      const isBookmarked = bookmarks.some(
        (savedBookmark) => savedBookmark.url === item.url
      );

      let newBookmarkStat = { ...bookmarkStat };

      if (!isBookmarked) {
        bookmarks.push(item);
        await AsyncStorage.setItem("savedBookmarks", JSON.stringify(bookmarks));
        newBookmarkStat[item.url] = true;
      } else {
        const updatedBookmarks = bookmarks.filter(
          (bookmark) => bookmark.url !== item.url
        );
        await AsyncStorage.setItem(
          "savedBookmarks",
          JSON.stringify(updatedBookmarks)
        );
        newBookmarkStat[item.url] = false;
      }

      setBookmarkStat(newBookmarkStat);
    } catch (error) {
      console.log("Bookmarking error: " + error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadBookmarks = async () => {
        try {
          const savedBookmarks = await AsyncStorage.getItem("savedBookmarks");
          let bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];

          let newBookmarkStat = {};
          bookmarks.forEach((bookmark) => {
            newBookmarkStat[bookmark.url] = true;
          });
          //@ts-expect-error ts(2345)
          setBookmarkStat(newBookmarkStat);
        } catch (error) {
          console.log("Loading bookmarks error: " + error);
        }
      };

      loadBookmarks();
    }, [])
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
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.urlToImage }} style={styles.image} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>
            {item?.title?.length > 60
              ? item?.title?.slice(0, 60) + "..."
              : item?.title}
          </Text>
          <Text style={styles.source}>
            {item.author ? item.author + ", " : ""}
            {item.source.name ? item.source.name : ""}
          </Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <TouchableOpacity
          style={styles.bookmarkContainer}
          onPress={() => toggleBookmark(item, id)}
        >
          <Icon
            name={bookmarkStat[item.url] ? "bookmark" : "bookmark-outline"}
            style={styles.bookmark}
          />
        </TouchableOpacity>
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
    flex: 1,
    flexDirection: "row",
    width: width * 0.9,
    borderRadius: 5,
    marginVertical: 12,
  },
  imageWrapper: {
    flex: 0.28,
  },

  image: {
    width: hp(10),
    height: hp(10),
    borderRadius: 5,
  },
  content: {
    flex: 0.67,
  },
  title: {
    fontSize: 13,
    fontFamily: "Quicksand-Bold",
    color: "#e0a16d",
    marginTop: 5,
  },
  source: {
    fontSize: 12,
    fontFamily: "Quicksand-Regular",
    color: "#e0a16d",
  },
  date: {
    fontSize: 12,
    fontFamily: "Quicksand-Regular",
    color: "#e0a16d",
  },
  bookmarkContainer: {
    flex: 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  bookmark: {
    fontSize: 20,
    color: "#e0a16d",
  },
});

export default RecommendedNews;
