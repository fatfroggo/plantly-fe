import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Pressable, StyleSheet, StatusBar, View } from 'react-native';

const Nav = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <Pressable
          style={styles.navPressable}
          onPress={() => {
            navigation.navigate('home');
          }}
        >
          <Text>Home</Text>
        </Pressable>
      </View>

      <View style={styles.view}>
        <Pressable
          style={styles.navPressable}
          onPress={() => {
            navigation.navigate('my-plants');
          }}
        >
          <Text>My Plants</Text>
        </Pressable>
      </View>

      <View style={styles.view}>
        <Pressable
          style={styles.navPressable}
          onPress={() => {
            navigation.navigate('plantpedia');
          }}
        >
          <Text>Plantpedia</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
  },
  navPressable: {
    alignItems: 'center',
  },
  view: {
    width: 100,
    flex: 1,
    backgroundColor: '#d9d9d9',
    margin: 10,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default Nav;
