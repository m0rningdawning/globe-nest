import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SearchBar from "../components/search/SearchBar";
import Categories from "../components/Categories";
import RecommendedNews from "../components/news/recommended/RecommendedNews";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import { fetchSearchAct } from "../../client/Api";

const SearchScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [res, setRes] = useState([]);
  const navigation = useNavigation();
  const inputRef = useRef(null);

  const handleSearch = async (search) => {
    if (search && search.length > 2) {
      setIsLoading(true);
      setRes([]);
      setIsLoading(false);
    }
    try {
      const data = await fetchSearchAct(search);
      setIsLoading(false);
      if (data && data.articles) {
        setRes(data.articles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelay = useCallback(debounce(handleSearch, 1000), []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      inputRef.current.focus();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        scrollEventThrottle={16}
      >
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>Search</Text>
        </View>
        <View style={styles.searchWrapper}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            onChangeText={handleDelay}
            placeholder="Search..."
            placeholderTextColor="#e0a16d"
          />
          {/* <TouchableOpacity>
            <Icon
              name="close-outline"
              style={{ color: "#e0a16d", fontSize: 25, marginTop: 5 }}
            />
          </TouchableOpacity> */}
        </View>
        <View style={styles.resultsLabelWrapper}>
          <Text style={styles.resultsLabel}> {res.length} Results found:</Text>
        </View>
        <View style={styles.content}>
          <RecommendedNews label={"Recommended"} data={res} />
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
    marginHorizontal: 20,
    marginTop: 10,
  },
  content: {
    backgroundColor: "#323242",
  },
  header: {
    fontSize: 28,
    fontFamily: "Quicksand-Bold",
    color: "#e0a16d",
    textTransform: "uppercase",
  },
  searchWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#22222b",
  },
  loading: {
    marginTop: 30,
  },
  input: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#323241",
    marginTop: 15,
    padding: 7,
    paddingLeft: 12,
    color: "#e0a16d",
  },
  resultsLabelWrapper: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  resultsLabel: {
    fontSize: 16,
    fontFamily: "Quicksand-Medium",
    color: "#e0a16d",
    textTransform: "uppercase",
  },
});

export default SearchScreen;
