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

const SavedScreen = () => {
  const [bookmarkedData, setBookmarkedData] = useState([]);
  const clearBookmarks = async () => {
    try {
      await AsyncStorage.removeItem("savedBookmarks");
      setBookmarkedData([]);
    } catch (error) {
      console.log("Clearing bookmarks error: " + error);
    }
  };

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

  useEffect(() => {
    loadBookmarks();
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved</Text>
        <TouchableOpacity style={styles.button} onPress={clearBookmarks}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
      >
        <RecommendedNews
          label={"Saved"}
          bookmarkedOnly={true}
          bookmarkedData={bookmarkedData}
          setBookmarkedData={setBookmarkedData}
        />
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
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: "Quicksand-Bold",
    textTransform: "uppercase",
    color: "#e0a16d",
  },
  button: {
    backgroundColor: "#e0a16d",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: "Quicksand-Medium",
    color: "#22222b",
  },
});

export default SavedScreen;
