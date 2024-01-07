import { View, Text } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const MySplashScreen = () => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    "Roboto-Black": require("../../assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Quicksand-Bold": require("../../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("../../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("../../assets/fonts/Quicksand-Regular.ttf"),
    "RubikBubbles-Regular": require("../../assets/fonts/RubikBubbles-Regular.ttf"),
    "RubikMaps-Regular": require("../../assets/fonts/RubikMaps-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }

    setTimeout(() => {
      navigation.navigate("HomeScreen" as never);
    }, 2000);
  }, []);

  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1e1e1e",
        justifyContent: "center",
        alignItems: "center",
      }}
      onLayout={onLayoutRootView}
    >
      <Text
        style={{
          fontFamily: "RubikBubbles-Regular",
          fontSize: 30,
          color: "#e0a16d",
        }}
      >
        {" "}
        GLOBE NEST{" "}
      </Text>
    </View>
  );
};

export default MySplashScreen;
