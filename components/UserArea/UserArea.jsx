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
    width: '100%',
    backgroundColor: '#ECEBE7',
    flex: 1,
    color: '#1E2720',
  },
  userAreaHeader: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2B8B30',
  },
  userAreaBody: {
    flex: 6,
  },
});

export default UserArea;
