import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './components/Home'; 

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        {/* <Stack.Screen
          options={{headerShown: false}}
          name="Settings"
          component={SettingScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="About"
          component={AboutScreen}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
