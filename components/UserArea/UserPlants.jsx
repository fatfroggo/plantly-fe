import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import Nav from '../Nav';
import UserAreaHeader from './UserAreaHeader';

import { useEffect, useState } from 'react';
import { getUserPlants } from '../../api/api';

const UserPlants = ({ navigation }) => {
  const [pressed, setPressed] = useState(false);
  const [userPlantsData, setUserPlantsData] = useState([]);

  useEffect(() => {
    getUserPlants().then(plants => {
      setUserPlantsData(plants);
    });
  }, []);

  const toggleIsPressed = () => {
    setPressed(true);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <StatusBar
          animated={true}
          barStyle="light-content"
          showHideTransition="slide"
          backgroundColor={styles.header.backgroundColor}
        />
        <View style={styles.header}>
          <UserAreaHeader header="My Plants" style={styles.header} />
          <Nav navigation={navigation} />
        </View>
      </SafeAreaView>

      <View style={styles.userAreaBody}>
        <View style={styles.filterAndSortByContainer}>
          <Pressable style={styles.button}>
            <Text>Filter</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text>Sort by</Text>
          </Pressable>
        </View>

        <FlatList
          numColumns={2}
          data={userPlantsData}
          renderItem={itemData => {
            return (
              <Pressable style={styles.plantsListItem}>
                <View style={styles.plantItemImage}>
                  <Image
                    source={{ uri: itemData.item.picture_url }}
                    style={{ height: 50, width: 50, borderRadius: 100 }}
                  />
                </View>

                <View style={styles.plantItemInfo}>
                  <Text>{itemData.item.nickname}</Text>
                  <Text style={styles.info}>{itemData.item.common_name}</Text>

                  <Text
                    style={styles.info}
                  >{`Watered ${itemData.item.last_watered} day(s) ago`}</Text>
                </View>
              </Pressable>
            );
          }}
          keyExtractor={(item, index) => {
            return item.my_plant_id;
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D9D9D9',
    flex: 5,
  },

  safe: {
    width: '100%',
    flex: 0.5,
    backgroundColor: '#2B8B30',
    color: '#1E2720',
  },

  userAreaBody: {
    flex: 1,
    padding: 5,
  },

  filterAndSortByContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },

  button: {
    backgroundColor: '#F1F1F2',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    marginHorizontal: 10,
    borderRadius: 20,
  },

  plantsList: { flex: 1 },

  header: { flex: 1.5, color: '#F1F1F2', paddingTop: StatusBar.currentHeight },

  headerText: { color: '#F1F1F2', fontSize: 40 },

  subHeadingText: { color: '#F1F1F2' },

  plantsListItem: {
    backgroundColor: '#F1F1F2',
    borderRadius: 20,
    flexDirection: 'row',
    flex: 1,
    margin: 5,
    alignItems: 'center',
    paddingVertical: 10,
    paddingRight: 5,
  },

  plantItemImage: { alignItems: 'center', paddingHorizontal: 10 },

  plantItemInfo: {
    flex: 1,
  },
  info: {
    fontSize: 12,
  },
});

export default UserPlants;
