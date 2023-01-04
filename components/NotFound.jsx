import { View, Text, Image, StyleSheet } from "react-native";

const NotFound = () => {
  return (
    <View style={styles.container}>
      <Text>404: Page Not Found</Text>
      <Image
        source={{
          uri: "http://www.digitalmesh.com/blog/wp-content/uploads/2020/05/404-error.jpg",
        }}
        style={{ height: "100%", width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7F9B91',
    flexDirection: 'row',
  },
})

export default NotFound;
