import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, StatusBar, Modal, Image } from "react-native";
import { SafeAreaView } from "react-native";
import { getForum } from "../api/api";
import Forum from "./Forum";
import Nav from "./Nav";
import UserAreaHeader from "./UserArea/UserAreaHeader";

const ForumPage = () => {
  const [forums, setForums] = useState([]);
  const [forumLoading, setForumLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getForum().then((forums) => {
      setForums(forums);
      setForumLoading(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        barStyle="light-content"
        showHideTransition="slide"
        backgroundColor={styles.container.backgroundColor}
      />
      <SafeAreaView style={styles.safe}>
        <UserAreaHeader
          header="Plantly Forum"
          subHeader="Common dilemmas for houseplants"
        />
        <Nav navigation={navigation} />
      </SafeAreaView>
      {forumLoading ? (
        <View
          style={{
            flex: 1,
            // justifyContent: "center",
            // marginTop: "20%",
            backgroundColor: "#729d84",
          }}
        >
          <Image
            source={require("../assets/loadingLight.gif")}
            style={{ alignSelf: "center", height: 200, width: 200 }}
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
    backgroundColor: "#729d84",
  },
  safe: {
    justifyContent: "flex-end",
    flex: 0.5,
    color: "#729d84",
  },
  headerText: {
    alignItems: "center",
    paddingBottom: 5,
  },
});

export default ForumPage;
