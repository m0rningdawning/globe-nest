import { View, Text, StyleSheet, Switch } from "react-native";
import React, { useState } from "react";

// Fix shake enabled in home, app and here
const SettingsScreen = ({ shakeEnabled, setShakeEnabled }) => {
  const toggleShake = () => {
    setShakeEnabled(!shakeEnabled);
  };

  return (
    <View style={[styles.container]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: "#e0a16d" }}>Shake to Update </Text>
        {/* <Switch value={shakeEnabled} onValueChange={toggleShake} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22222b",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;
