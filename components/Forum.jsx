import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
} from "react-native";

const Forum = ({ forums }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={forums}
        renderItem={(itemData) => {
          return (
            <View style={styles.plantsListItem}>
              <Text style={styles.postName}>{itemData.item.title}</Text>
              <Text style={styles.authorName}>
                Written By: {itemData.item.author}
              </Text>
              <Text style={styles.infoText}>
                {itemData.item.link_to_reddit_post}
              </Text>
              <View style={styles.redditImage}>
                <Image
                  style={{ height: 200, width: 200, borderRadius: 30 }}
                  source={{ uri: itemData.item.thumbnail }}
                />
              </View>
              <Text style={styles.plantInfo}>Votes: {itemData.item.votes}</Text>
              <Text style={styles.plantInfo}>
                Awards Recieved: {itemData.item.total_awards_received}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d9d9d9",
  },
  headerText: {
    flex: 1,
    alignItems: "center",
  },
  redditImage: {
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
    alignItems: "center",
  },
  authorName: {
    color: "#729d84",
    fontSize: 12,
    fontFamily: "Raleway_500Medium_Italic",
  },
  infoText: {
    fontFamily: "Raleway_600SemiBold",
    textDecorationLine: "underline",
    fontSize: 13,
    color: "#294753",

    paddingVertical: 5,
  },
  postName: {
    fontFamily: "Raleway_700Bold",

    color: "#041b27",
    fontSize: 20,
  },
  plantsListItem: {
    backgroundColor: "#f8fdfb",
    borderRadius: 20,
    flexDirection: "column",
    flex: 1,
    margin: 10,
    padding: 20,
  },
  plantInfo: { fontFamily: "Raleway_400Regular", color: "#041b27" },
});

export default Forum;
