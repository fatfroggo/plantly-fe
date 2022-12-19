import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import Nav from '../Nav';
import UserAreaHeader from './UserAreaHeader';

const UserArea = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userAreaHeader}>
        <UserAreaHeader />
        <Nav navigation={navigation} />
      </View>
      <View style={styles.userAreaBody}>
        <Text>This is the user area</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F2',
    flex: 1,
    alignItems: 'center',
    color: '#27242A',
  },
  userAreaHeader: {
    flex: 3,
    backgroundColor: '#46B646',
  },
  userAreaBody: {
    flex: 6,
  },
});

export default UserArea;
