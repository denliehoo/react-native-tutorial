import { StyleSheet, Text, View } from "react-native";
import Colors from "../../utils/colors";
import { Dimensions } from "react-native";
const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    borderRadius: 8,
    padding: 16,
    marginTop: deviceWidth < 380 ? 18 : 36,
    backgroundColor: Colors.primary800,
    // box-shadow doesnt exist for react-native, furthermore,
    // a similar efffect of android and ios is achieved differently,
    // for android, we have elevation
    elevation: 4,
    // for ios, we have shadowXxx
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
