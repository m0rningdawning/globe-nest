import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

type HeaderProps = {
  style?: object;
};

const Header: React.FC<HeaderProps> = ({ style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View>
        <Text style={[styles.title, style]}>GLOBE NEST</Text>
      </View>
      <View>
        <TouchableOpacity style= {[styles.iconWrapper, style]}>
          <Icon name="search-outline" style = {[styles.icon, style]} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0a16d",
  },
  title: {
    fontSize: 28,
    fontFamily: "RubikBubbles-Regular",
    color: "#e0a16d",
    textTransform: "uppercase",
  },
  iconWrapper: {
    width: 35,
    height: 35,
    backgroundColor: "#323241",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    fontSize: 23,
    color: "#e0a16d",
  },
});

export default Header;
