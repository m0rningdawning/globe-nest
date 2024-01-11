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
    alignItems: "center",
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
    width: 40,
    height: 40,
    backgroundColor: "#e0a16d",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    fontSize: 25,
    color: "#22222b",
  },
});

export default Header;
