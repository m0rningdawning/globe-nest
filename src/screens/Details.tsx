import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
  Share,
} from "react-native";
import React, { useState } from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsScreen = () => {
  const [visible, setVisible] = useState(false);
  const [bookmarkStat, setBookmarkStat] = useState([]);

  const navigation = useNavigation();

  const route = useRoute();
  const item = route.params;

  const onShare = async () => {
    try {
      await Share.share({
        //@ts-expect-error ts(2339)
        message: item.url,
      });
    } catch (error) {
      console.log("Sharing error: " + error);
    }
  };

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

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconWrapper}
          >
            <Icon name="arrow-back-outline" style={styles.icon} />
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={onShare} style={styles.iconWrapper}>
              <Icon name="share-outline" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              //@ts-expect-error ts(2554)
              onPress={() => toggleBookmark(item)}
              style={styles.iconWrapper}
            >
              <Icon
                //@ts-expect-error ts(2339)
                name={bookmarkStat[item.url] ? "bookmark" : "bookmark-outline"}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <WebView
          source={{
            // @ts-ignore
            uri: item.url,
          }}
          onLoadStart={() => setVisible(true)}
          onLoadEnd={() => setVisible(false)}
          style={{ marginTop: 20 }}
        />
        {visible && <ActivityIndicator size="large" color="#e0a16d" />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22222b",
  },
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 10,
  },
  iconWrapper: {
    width: 35,
    height: 35,
    backgroundColor: "#e0a16d",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 5,
  },
  icon: {
    fontSize: 20,
    color: "#22222b",
  },
});

export default DetailsScreen;
