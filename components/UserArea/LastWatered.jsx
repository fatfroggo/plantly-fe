import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { countDown } from "../../utils/utils";

const LastWatered = ({ plant, wateredToday }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setTimeLeft(
      countDown(plant.time_between_watering, plant.last_watered_date)
    );
  }, [wateredToday]);

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
          <Text style={styles.timeLeft2}>{timeLeft} days until water</Text>
        </View>
      </>
    );
  } else {
    return (
      <>
        <View style={styles.text}>
          <Text style={styles.timeLeft3}>{timeLeft} days until water</Text>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  text: {
    // textAlignVertical: "center",
    // justifyContent: "flex-start",
    flex: 1,
    // paddingVertical: 1,
    // alignItems: "center",
    justifyContent: "flex-start",
  },
  timeLeft0: {
    // textAlign: "center",
    fontFamily: "Raleway_600SemiBold",
    // fontSize: 16,
    // alignSelf: "center",
    color: "red",
  },
  timeLeft2: {
    // textAlign: "center",
    fontFamily: "Raleway_500Medium",
    // fontSize: 12,
    color: "#d88001",
  },
  timeLeft3: {
    // textAlign: "center",
    fontFamily: "Raleway_500Medium",
    // textAlignVertical: "center",
    // fontSize: 12,
    flex: 1,
    color: "#2b8b30",
  },
});
export default LastWatered;
