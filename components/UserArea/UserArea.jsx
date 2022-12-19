import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import Nav from '../Nav';
import UserAreaHeader from './UserAreaHeader';

const UserArea = () => {
  return (
    <View style={styles.container}>
      <UserAreaHeader />
      <Nav />
      <View style={styles.userAreaBody}>
        <Text>This is the user area</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(
  {
    container: {
      backgroundColor: '#F1F1F2',
      flex: 1,
      alignItems: 'center',
      color: '#27242A',
    },
    userAreaBody: {
      flex: 5,
    },
  },
  {
    app: { backgroundColor: 'red' },
  }
);

export default UserArea;
