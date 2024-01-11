import { View, Text, StyleSheet } from "react-native";
import React from "react";

const SavedScreen = () => {
  return (
    <View style={[styles.container]}>
      <Text>Saved Screen</Text>
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

export default SavedScreen;
