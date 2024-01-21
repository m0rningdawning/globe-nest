import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const SearchBar = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Search" as never);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Icon name="search-outline" style={styles.icon} />
        <Text style={styles.input}>Search...</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#323241",
    marginTop: 15,
  },
  input: {
    height: 40,
    color: "#e0a16d",
    paddingLeft: 10,
    lineHeight: 40,
  },
  icon: {
    fontSize: 20,
    color: "#e0a16d",
    lineHeight: 40,
    paddingLeft: 10,
  },
});

export default SearchBar;
