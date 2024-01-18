import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RecommendedNews from "../components/news/recommended/RecommendedNews";

const { width } = Dimensions.get("window");

const SavedScreen = () => {
  const [saved, setSaved] = React.useState([]);
  const [utlList, setUrlList] = useState([]);
  const [bookmarkStat, setBookmarkStat] = useState([]);

  // const onPress = (item) => {
  //   // @ts-expect-error ts(2345)
  //   navigation.navigate("Details", item);
  // };

  // const toggleBookmark = async (item, id) => {
  //   try {
  //     const savedBookmars = await AsyncStorage.getItem("savedBookmarks");
  //     let bookmarks = savedBookmars ? JSON.parse(savedBookmars) : [];

  //     const isBookmarked = bookmarks.some(
  //       (savedBookmark) => savedBookmark.url === item.url
  //     );

  //     let newBookmarkStat = { ...bookmarkStat };

  //     if (!isBookmarked) {
  //       bookmarks.push(item);
  //       await AsyncStorage.setItem("savedBookmarks", JSON.stringify(bookmarks));
  //       newBookmarkStat[item.url] = true;
  //     } else {
  //       const updatedBookmarks = bookmarks.filter(
  //         (bookmark) => bookmark.url !== item.url
  //       );
  //       await AsyncStorage.setItem(
  //         "savedBookmarks",
  //         JSON.stringify(updatedBookmarks)
  //       );
  //       newBookmarkStat[item.url] = false;
  //     }

  //     setBookmarkStat(newBookmarkStat);
  //   } catch (error) {
  //     console.log("Bookmarking error: " + error);
  //   }
  // };

  // const renderItem: React.FC<{
  //   item: any;
  //   id: any;
  // }> = ({ item, id }) => {
  //   const date = new Date(item.publishedAt);

  //   const formattedDate = date.toLocaleDateString("en-US", {
  //     weekday: "short",
  //     hour: "numeric",
  //     day: "numeric",
  //     month: "short",
  //     year: "numeric",
  //   });

  //   return (
  //     <TouchableOpacity
  //       style={itemStyles.item}
  //       key={id}
  //       onPress={() => onPress(item)}
  //     >
  //       <View style={itemStyles.imageWrapper}>
  //         <Image source={{ uri: item.urlToImage }} style={itemStyles.image} />
  //       </View>
  //       <View style={itemStyles.content}>
  //         <Text style={itemStyles.title}>
  //           {item?.title?.length > 60
  //             ? item?.title?.slice(0, 60) + "..."
  //             : item?.title}
  //         </Text>
  //         <Text style={itemStyles.source}>
  //           {item.author ? item.author + ", " : ""}
  //           {item.source.name ? item.source.name : ""}
  //         </Text>
  //         <Text style={itemStyles.date}>{formattedDate}</Text>
  //       </View>
  //       <TouchableOpacity
  //         style={itemStyles.bookmarkContainer}
  //         onPress={() => toggleBookmark(item, id)}
  //       >
  //         <Icon
  //           name={bookmarkStat[item.url] ? "bookmark" : "bookmark-outline"}
  //           style={itemStyles.bookmark}
  //         />
  //       </TouchableOpacity>
  //     </TouchableOpacity>
  //   );
  // };

  // useEffect(() => {
  //   const urls = saved.map((item) => item.url);
  //   setUrlList(urls);
  // }, [saved]);

  // useEffect(() => {
  //   const loadBookmarks = async () => {
  //     try {
  //       const savedBookmarks = await AsyncStorage.getItem("savedBookmarks");
  //       let bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];

  //       let newBookmarkStat = {};
  //       bookmarks.forEach((bookmark) => {
  //         newBookmarkStat[bookmark.url] = true;
  //       });
  //       //@ts-expect-error ts(2345)
  //       setBookmarkStat(newBookmarkStat);
  //     } catch (error) {
  //       console.log("Loading bookmarks error: " + error);
  //     }
  //   };

  //   loadBookmarks();
  // }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Saved</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
        {/* <RecommendedNews label={"Saved"} data={saved} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22222b",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 30,
    fontFamily: "Quicksand-Bold",
    textTransform: "uppercase",
    color: "#e0a16d",
  },
  button: {
    backgroundColor: "#e0a16d",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: "Quicksand-Medium",
    color: "#22222b",
  },
});

export default SavedScreen;
