import { Text, View, StyleSheet } from "react-native";
import React from "react";

type SubHeaderProps = {
  label: string;
};

const SubHeader: React.FC<SubHeaderProps> = ({ label }) => {
  return (
    <View style={[styles.wrapper]}>
      <View style={[styles.container]}>
        <Text style={[styles.label]}>{label}</Text>
        <View style={[styles.more]}>
          <Text style={[styles.moreText]}>More</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#22222b",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    fontFamily: "Quicksand-Medium",
    color: "#e0a16d",
    textTransform: "uppercase",
    marginVertical: 10,
  },
  more: {
    width: 50,
    height: 25,
    backgroundColor: "#323241",
    borderRadius: 5,
  },
  moreText: {
    fontSize: 15,
    fontFamily: "Quicksand-Regular",
    textAlign: "center",
    color: "#e0a16d",
  },
});

export default SubHeader;
