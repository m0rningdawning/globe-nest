import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

const DetailsScreen = () => {
  const navigation = useNavigation();

  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const {params: item} = useRoute();

  const toggleBookmark = async () => {};
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconWrapper}
          >
            <Icon name="arrow-back-outline" style={styles.icon} />
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.iconWrapper}
            >
              <Icon name="share-outline" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.iconWrapper}
            >
              <Icon
                name="bookmark-outline"
                style={styles.icon}
                onPress={toggleBookmark}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <WebView
          source={{
            // @ts-ignore
            uri: item.url,
          }}
          onLoadStart={() => setVisible(true)}
          onLoadEnd={() => setVisible(false)}
          style={{ marginTop: 20 }}
        />
        {
          visible && <ActivityIndicator size="large" color="#e0a16d" />
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22222b",
  },
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 10,
  },
  iconWrapper: {
    width: 35,
    height: 35,
    backgroundColor: "#e0a16d",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 5,
  },
  icon: {
    fontSize: 20,
    color: "#22222b",
  },
});

export default DetailsScreen;
