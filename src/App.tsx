import React, { useEffect } from "react";
import { View } from "react-native";
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
  <Stack.Navigator>
    <Stack.Screen
      options={{ headerShown: false }}
      name="HomeS"
      component={HomeScreen}
    />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
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

  return (
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
            borderTopWidth: 1,
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
    </NavigationContainer>
  );
};

export default App;
