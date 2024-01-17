import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native";

type CategoriesProps = {
  bubbles: any;
  active: any;
  handleChange: (category: any) => void;
};

const Categories: React.FC<CategoriesProps> = ({
  bubbles,
  active,
  handleChange,
}) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.bubblesWrapper}
      >
        {bubbles.map((category: any, id: any) => {
          let isActive = category.title == active;
          let bubbleStyle = isActive ? styles.activeBubble : styles.bubble;
          let textStyle = isActive ? styles.activeText : styles.text;
          return (
            <TouchableOpacity
              key={id}
              style={bubbleStyle}
              onPress={() => handleChange(category.title)}
            >
              <Text style ={textStyle}>
                {category.title.charAt(0).toUpperCase() +
                  category.title.slice(1)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bubblesWrapper: {
    flexDirection: "row",
    marginBottom: 20,
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#323241",
    marginRight: 10,
  },
  activeBubble: {
    backgroundColor: "#e0a16d",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  text: {
    color: "#e0a16d",
  },
  activeText: {
    color: "#22222b",
  },
});

export default Categories;
