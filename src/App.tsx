import * as React from "react";
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
            backgroundColor: "#22222c",
            borderTopWidth: 1,
            borderTopColor: "#e0a16d",
          },
          tabBarIcon: ({ focused }) => {
            let iconName: string = "";
            let size: number = 20;
            let color: string = focused ? "#e0a16d" : "#e0a16d";
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
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
