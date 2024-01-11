import { View, Text, StyleSheet } from "react-native";
import React from "react";

const SearchScreen = () => {
  return (
    <View style={[styles.container]}>
      <Text>Search Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22222b",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchScreen;
