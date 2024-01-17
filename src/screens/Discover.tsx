import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/search/SearchBar";

const DiscoverScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>Discover</Text>
        <Text style={styles.subheader}>Those might interest you</Text>
        <SearchBar />
      </View>
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
  subheader: {
    fontSize: 16,
    fontFamily: "Quicksand-Medium",
    color: "#e0a16d",
    textTransform: "uppercase",
  },
});

export default DiscoverScreen;
