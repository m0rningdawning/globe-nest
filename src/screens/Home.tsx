import React, { Component, useState, useRef, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useQuery } from "@tanstack/react-query";

import { fetchRecommendedUs, fetchTopUs, fetchTopUsAct } from "../../client/Api";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import TopNews from "../components/TopNews";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";

import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  View,
  SafeAreaView,
  DrawerLayoutAndroid,
  FlatList,
  Dimensions,
  Platform,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const HomeScreen = () => {
  const [colorScheme, setColorScheme] = useState("dark");
  const [topNews, setTopNews] = useState([]);
  const [recNews, setRecNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchUsData = async () => {
      setIsLoading(true);
      const data = await fetchTopUsAct();
      setTopNews(data.articles);
      console.log("Top News:" + data);
      setIsLoading(false);
    };

    fetchUsData();
  }, []);

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
      <SafeAreaView style={[styles.container]}>
        <StatusBar style={colorScheme === "dark" ? "dark" : "light"} />
        <Header />

        {isLoading ? (
          <View>
            <ActivityIndicator size="large" color="#e0a16d" />
          </View>
        ) : (
          <View>
            <SubHeader label="Top News" />
            <TopNews label={TopNews} data={topNews} />
          </View>
        )}
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22222b",
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: "#e0a16d",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 13,
    fontFamily: "Roboto",
    color: "#212121",
  },
  logo: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "#e0a16d",
    textTransform: "uppercase",
  },
  titleNoList: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "#e0a16d",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  login: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    color: "#e0a16d",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#e0a16d",
    padding: 10,
  },
  drawerOutContainer: {
    backgroundColor: "#24242e",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "rgba(224, 161, 109, 0.5)",
    borderBottomWidth: 1,
    padding: 10,
  },
  drawerInContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  drawerText: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 20,
    fontFamily: "Roboto",
    color: "#e0a16d",
  },
  activePreset: {
    width: 40,
    alignContent: "center",
    backgroundColor: "#e0a16d",
    borderRadius: 5,
    padding: 5,
  },
  apText: {
    fontSize: 15,
    fontFamily: "Roboto",
    color: "#22222e",
    textAlign: "center",
  },
  itemTitle: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "#e0a16d",
  },
  itemIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  addButtonOut: {
    position: "absolute",
    bottom: 25,
    right: 25,
  },
  addButtonIn: {
    width: 50,
    height: 50,
    backgroundColor: "#e0a16d",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 40,
    fontFamily: "Roboto",
    color: "#22222e",
  },
  iconArea: {
    width: 30,
    height: 30,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
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
