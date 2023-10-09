import { StyleSheet, Text, View, TextInput } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
const StartGameScreen = () => {
  return (
    <View style={styles.inputContainer}>
      {/* Note: if it is a number, we do maxLength={2} which makes it 2 digits only
      If it is a string, we can do maxLength="2" which means it is 2 characters only */}
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        // by default, the normal keyboard is chosen, here, we
        // make the numberpad keyboard appear instead when we click on the text field
        keyboardType="number-pad"
      />
      <PrimaryButton>Reset</PrimaryButton>
      <PrimaryButton>Confirm</PrimaryButton>
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 24,
    borderRadius: 8,
    padding: 16,
    marginTop: 100,
    backgroundColor: "#72063c",
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
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: "#ddb52f",
    borderBottomWidth: 2,
    color: "#ddb52f",
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
});
