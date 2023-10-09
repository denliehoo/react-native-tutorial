import { StyleSheet, Text, View, Pressable } from "react-native";

const GoalItem = (props) => {
  return (
    <View style={styles.goalItem}>
      {/* Pressable makes the wrapped components around it pressable */}
      <Pressable
        onPress={props.onDeleteItem.bind(this, props.id)}
        // essentially, upon pressed something, show this style.
        style={(pressedData) => pressedData.pressed && styles.pressedItem}
        // Alternative can destructure and do this instead
        // style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "purple",
  },
  goalText: {
    color: "white",
    padding: 8,
  },
  pressedItem: {
    opacity: 0.5,
  },
});
