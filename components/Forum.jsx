
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";

const Forum = ({forums}) => {

  return (
      <View>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7F9B91",
  },
  headerText: {
    flex: 1,
    alignItems: "center"
  },
  redditImage: {
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
    alignItems: "center",
  },
  authorName: {
    fontSize: 13,
    fontStyle: "italic",
  },
  infoText: {
    fontSize: 13,
    paddingVertical: 5,
  },
  postName: {
    fontWeight: "bold",
    fontSize: 18,
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
