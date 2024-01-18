import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/search/SearchBar";
import Categories from "../components/Categories";
import { fetchCategories, fetchTopUsAct } from "../../client/Api";
import SubHeader from "../components/headers/SubHeader";
import RecommendedNews from "../components/news/recommended/RecommendedNews";

const categories = [
  { id: 1, title: "general" },
  { id: 2, title: "technology" },
  { id: 3, title: "science" },
  { id: 4, title: "health" },
  { id: 5, title: "business" },
  { id: 6, title: "entertainment" },
  { id: 7, title: "sports" },
];

const DiscoverScreen = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [discover, setDiscover] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategoryData = async () => {
    setIsLoading(true);
    const data = await fetchCategories(activeCategory);
    setDiscover(data.articles);
    console.log("Top News:" + data.totalResults);
    setIsLoading(false);
  };

  const handleCategoryChange = (category) => {
    if (category === activeCategory) return;
    setDiscover([]);
    setActiveCategory(category);
  };

  useEffect(() => {
    fetchCategoryData();
  }, [activeCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        scrollEventThrottle={16}
      >
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>Discover</Text>
          <Text style={styles.subheader}>Those might interest you</Text>
        </View>
        <View style={styles.searchWrapper}>
          <SearchBar />
        </View>
        <View style={styles.bubbles}>
          <Categories
            bubbles={categories}
            active={activeCategory}
            handleChange={handleCategoryChange}
          />
        </View>
        <View>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#e0a16d"
              style={[styles.loading]}
            />
          ) : (
            <RecommendedNews label={"Recommended"} data={discover} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22222b",
  },
  headerWrapper: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
  },
  header: {
    fontSize: 28,
    fontFamily: "Quicksand-Bold",
    color: "#e0a16d",
    textTransform: "uppercase",
  },
  searchWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#22222b",
  },
  subheader: {
    fontSize: 16,
    fontFamily: "Quicksand-Medium",
    color: "#e0a16d",
    textTransform: "uppercase",
  },
  bubbles: {
    flex: 1,
    marginHorizontal: 20,
  },
  loading: {
    marginTop: 30,
  },
});

export default DiscoverScreen;
