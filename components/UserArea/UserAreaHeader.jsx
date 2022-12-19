import { Text, View, StyleSheet, StatusBar } from 'react-native';

const UserAreaHeader = () => {
  return (
    <View style={styles.container}>
      <Text styles={styles.headerText}>User area header</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#46B646',
    alignSelf: 'stretch',
    flex:1
  }, headerText: {
    paddingTop: StatusBar.currentHeight,
  }
});

export default UserAreaHeader;
