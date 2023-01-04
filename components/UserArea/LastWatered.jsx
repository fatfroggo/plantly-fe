import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { countDown } from "../../utils/utils";

const LastWatered = ({ plant }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setTimeLeft(
      countDown(plant.time_between_watering, plant.last_watered_date)
    );
  }, []);

  if (timeLeft === 0) {
    return (
      <>
        <View style={styles.text}>
          <Text style={styles.timeLeft0}>Needs Water</Text>
        </View>
      </>
    );
  } else if (timeLeft <= 2) {
    return (
      <>
        <View style={styles.text}>
          <Text style={styles.timeLeft2}>{timeLeft} days until next water</Text>
        </View>
      </>
    );
  } else {
    return (
      <>
        <View style={styles.text}>
          <Text style={styles.timeLeft3}>{timeLeft} days until next water</Text>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    paddingVertical: 1,
  },
  timeLeft0: {
    // fontSize: 12,
    color: "red",
  },
  timeLeft2: {
    // fontSize: 12,
    color: "#d88001",
  },
  timeLeft3: {
    // fontSize: 12,
    color: "#ECEBE7",
  },
});
export default LastWatered;
