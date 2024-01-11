import { View, Text, StyleSheet } from "react-native";
import React from "react";

const DiscoverScreen = () => {
  return (
    <View style={[styles.container]}>
      <Text>Discover Screen</Text>
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

export default DiscoverScreen;
