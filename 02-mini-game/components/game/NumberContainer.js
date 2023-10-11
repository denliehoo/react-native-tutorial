import { StyleSheet, Text, View } from "react-native";
import Colors from "../../utils/colors";
import { Dimensions } from "react-native";
const NumberContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
};

export default NumberContainer;

// allows us to get the width of the device
// Note: windows vs screen is that screen is the screen size
// window is the usable screen size (i.e. excluding the black fillings on the side of the phone)
// for android, there is usually a diff, but there is no diff for iphone
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: deviceWidth < 450 ? 12 : 24,
    margin: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    width: "80%",
  },
  numberText: {
    color: Colors.accent500,
    fontSize: 36,
    fontFamily: "open-sans-bold",
  },
});
