import { useEffect, useState } from "react";
import { Text, View, StyleSheet, StatusBar, Modal, Image } from "react-native";
import { SafeAreaView } from "react-native";
import { getForum } from "../api/api";
import Forum from "./Forum";
import ForumNav from "./ForumNav";
import UserAreaHeader from "./UserArea/UserAreaHeader";

const ForumPage = () => {
  const [forums, setForums] = useState([]);
  const [forumLoading, setForumLoading] = useState(true);

  useEffect(() => {
    getForum().then((forums) => {
      setForums(forums);
      setForumLoading(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <UserAreaHeader
          header="Forums"
          subHeader="Common dilemmas for houseplants"
          style={styles.headerText}
        />
        <ForumNav />
      </SafeAreaView>
      {forumLoading ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../assets/loadingLight.gif")}
            style={{ flex: 1, alignSelf: "center", width: 40 }}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Forum forums={forums} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7F9B91",
  },
  safe: {
    justifyContent: "flex-end",
    flex: 0.5,
    color: "#1E2720",
  },
  headerText: {
    flex: 1,
    alignItems: "center",
  },
});

export default ForumPage;
