import { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getForum } from "../api/api";
import UserAreaHeader from "./UserArea/UserAreaHeader";

const Forum = () => {

    const [forums, setForums] = useState([])

    useEffect(() => {
        getForum().then((forums) => {
            setForums(forums)
        })
    }, [])

    return (
      <View style={styles.container}>
          <UserAreaHeader header="Forum" style={styles.headerText} />

          <FlatList
            data={forums}
            renderItem={(itemData) => {
                return (
                  <View style={styles.plantsListItem}>
                    <Text style={styles.commonName}>{itemData.item.title}</Text>
                    <Text style={styles.authorName}>
                      Written By: {itemData.item.author}
                    </Text>
                    <Text style={styles.infoText}>
                      {itemData.item.link_to_reddit_post}
                    </Text>
                    <View style={styles.redditImage}>
                      <Image
                        style={{ height: 200, width: 200, borderRadius: 20 }}
                        source={{ uri: itemData.item.thumbnail }}
                      />
                    </View>
                    <Text style={styles.plantInfo}>
                      Votes: {itemData.item.votes}
                    </Text>
                    <Text style={styles.plantInfo}>
                      Awards Recieved: {itemData.item.total_awards_received}
                    </Text>
                  </View>
                );
            }}
          />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7F9B91",
  },
  redditImage: {
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
    alignItems: "center",
  },
  authorName: {
    fontSize: 20,
    fontStyle: "italic",
  },
  infoText: {
    fontSize: 15,
    paddingVertical: 5,
  },
  plantsListItem: {
    backgroundColor: "#F1F1F2",
    borderRadius: 20,
    flexDirection: "column",
    flex: 1,
    margin: 10,
    padding: 20,
  },
});

export default Forum;