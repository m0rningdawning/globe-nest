import React, { Component, useState, useRef, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useQuery } from "@tanstack/react-query";
import { Accelerometer } from "expo-sensors";

import {
  fetchRecommendedUs,
  fetchRecommendedUsAct,
  fetchTopUs,
  fetchTopUsAct,
} from "../../client/Api";
import Header from "../components/headers/Header";
import SubHeader from "../components/headers/SubHeader";
import TopNews from "../components/news/top/TopNews";
import RecommendedNews from "../components/news/recommended/RecommendedNews";

import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Animated,
  ScrollView,
  View,
  SafeAreaView,
  DrawerLayoutAndroid,
  FlatList,
  Dimensions,
  Platform,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const HomeScreen = ({ shakeEnabled }) => {
  const [colorScheme, setColorScheme] = useState("dark");
  const [topNews, setTopNews] = useState([]);
  const [recNews, setRecNews] = useState([]);
  const [isTopLoading, setIsTopLoading] = useState(false);
  const [isRecLoading, setIsRecLoading] = useState(false);

  // const { isLoading: topNewsLoading } = useQuery({
  //   queryKey: ["topNews"],
  //   queryFn: fetchExample,
  //   // @ts-expect-error ts(2769)
  //   onSuccess: (data) => {
  //     console.log("Top News:" + data.articles);
  //     setTopNews(data.articles);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  const fetchTopUsData = async () => {
    setIsTopLoading(true);
    const data = await fetchTopUsAct();
    setTopNews(data.articles);
    console.log("Top News:" + data.totalResults);
    setIsTopLoading(false);
  };

  const fetchRecUsData = async () => {
    setIsRecLoading(true);
    const data = await fetchRecommendedUsAct();
    setRecNews(data.articles);
    console.log("Rec News:" + data.totalResults);
    setIsRecLoading(false);
  };

  useEffect(() => {
    fetchTopUsData();
    fetchRecUsData();
  }, []);

  useEffect(() => {
    let subscription;

    const handleShake = () => {
      if (!shakeEnabled) {
        fetchTopUsData();
        fetchRecUsData();
        console.log("Shake event detected! Updating the page...");
      }
    };

    Accelerometer.setUpdateInterval(100);

    subscription = Accelerometer.addListener(({ x, y, z }) => {
      const acceleration = Math.abs(x) + Math.abs(y) + Math.abs(z);
      const shakeThreshold = 6;

      if (acceleration > shakeThreshold) {
        handleShake();
      }
    });

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [shakeEnabled]);

  // const { isLoading: recNewsLoading } = useQuery({
  //   queryKey: ["recNews"],
  //   queryFn: fetchExample,
  //   // @ts-expect-error ts(2769)
  //   onSuccess: (data) => {
  //     setRecNews(data.articles);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  if (Platform.OS === "ios") {
    // WIP
    return <Text>Running on iOS</Text>;
  } else if (Platform.OS === "android") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style={colorScheme === "dark" ? "dark" : "light"} />
        <Header />
        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[2]}
          scrollEventThrottle={16}
        >
          <SubHeader label="Top News" />
          <View>
            {isTopLoading ? (
              <ActivityIndicator
                size="large"
                color="#e0a16d"
                style={[styles.loading]}
              />
            ) : (
              <TopNews label={"Top News"} data={topNews} />
            )}
          </View>
          <SubHeader label="Recommended News" />
          <View>
            {isRecLoading ? (
              <ActivityIndicator
                size="large"
                color="#e0a16d"
                style={[styles.loading]}
              />
            ) : (
              <RecommendedNews label={"Recommended"} data={recNews} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22222b",
  },
  loading: {
    marginTop: 30,
  },
});

const menuOptionsStyles = {
  optionsContainer: {
    backgroundColor: "#e0a16d",
    padding: 10,
    borderRadius: 8,
  },
  optionWrapper: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#22222e",
  },
  optionText: {
    fontSize: 16,
    color: "#22222e",
  },
};

const menuTriggerStyles = {
  triggerTouchable: {
    activeOpacity: 1,
  },
};

export default HomeScreen;
