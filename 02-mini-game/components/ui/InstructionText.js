import { StyleSheet, Text, View } from "react-native";
import Colors from "../../utils/colors";
const InstructionText = ({ children, style }) => {
  // for multiple style we can put an array
  // note that styles are parsed from left to right
  // hence, if there is a clash, the style on the right would override the earlier ones
  // i.e. if color is red on the first style and blue on the second, then color would be blue
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});
