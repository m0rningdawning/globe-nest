import React, { useEffect, useState } from "react";
import { View, Modal } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useColorScheme } from "nativewind";
import HomeScreen from "./screens/Home";
import DetailsScreen from "./screens/Details";
import DiscoverScreen from "./screens/Discover";
import SavedScreen from "./screens/Saved";
import SearchScreen from "./screens/Search";
import SettingsScreen from "./screens/Settings";
import SplashScreen from "./screens/Splash";
import WelcomeScreen from "./screens/Welcome";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName="Splash">
    <Stack.Screen
      options={{ headerShown: false }}
      name="HomeScreen"
      component={HomeScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Splash"
      component={SplashScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Welcome"
      component={WelcomeScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Details"
      component={DetailsScreen}
    />
  </Stack.Navigator>
);

const TabIcon = ({
  focused,
  iconName,
}: {
  focused: boolean;
  iconName: string;
}) => {
  const size = 25;
  const color = "#e0a16d";
  const scaleValue = useSharedValue(1);

  useEffect(() => {
    scaleValue.value = withTiming(focused ? 1.4 : 1, {
      duration: 150,
    });
  }, [focused, scaleValue]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Icon name={iconName} size={size} color={color} />
    </Animated.View>
  );
};

const App = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);
  }, []);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#e0a16d",
            tabBarInactiveTintColor: "#e0a16d",
            tabBarStyle: {
              height: 60,
              backgroundColor: "#22222c",
              borderTopWidth: 0.5,
              borderTopColor: "#e0a16d",
            },

            tabBarIcon: ({ focused }) => {
              let iconName: string = "";

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Discover") {
                iconName = focused ? "compass" : "compass-outline";
              } else if (route.name === "Saved") {
                iconName = focused ? "archive" : "archive-outline";
              } else if (route.name === "Search") {
                iconName = focused ? "search" : "search-outline";
              } else if (route.name === "Settings") {
                iconName = focused ? "settings" : "settings-outline";
              }

              return <TabIcon focused={focused} iconName={iconName} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Discover" component={DiscoverScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Saved" component={SavedScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
        <Modal visible={isSplashVisible} transparent={false}>
          <SplashScreen />
        </Modal>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
