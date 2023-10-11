import { StyleSheet, Text, View } from "react-native";
import Colors from "../../utils/colors";
import { Platform } from "react-native";
const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    // fontWeight: "bold",
    color: "white",
    textAlign: "center",
    borderWidth: Platform.OS === "android" ? 2 : 0,
    // borderWidth: Platform.select({ android: 2, ios: 0 }),
    borderColor: "white",
    padding: 12,
    // dynamic width, essentially, it will be 300px
    // unless 80% is greater than 300px
    maxWidth: "80%",
    width: 300,
  },
});
