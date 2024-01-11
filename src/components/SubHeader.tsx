import { Text, View, StyleSheet } from "react-native";
import React from "react";

type SubHeaderProps = {
  label: string;
};

const SubHeader: React.FC<SubHeaderProps> = ({ label }) => {
  return (
    <View style={[styles.container]}>
      <Text style ={[styles.label]}>{label}</Text>
      <Text style ={[styles.more]}>More</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
  },
  label: {
    fontSize: 15,
    fontFamily: "Quicksand-Medium",
    color: "#e0a16d",
    textTransform: "uppercase",
    marginVertical: 10,
  },
  more: {
    fontSize: 15,
    fontFamily: "Quicksand-Regular",
    color: "#e0a16d",
    marginVertical: 10,
  },
});

export default SubHeader;
