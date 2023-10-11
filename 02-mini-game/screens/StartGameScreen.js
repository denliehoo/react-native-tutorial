import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../utils/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { useWindowDimensions } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
const StartGameScreen = ({ onPickNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const numberInputHandler = (entered) => {
    setEnteredNumber(entered);
  };

  const resetInputHandler = () => {
    setEnteredNumber("");
  };

  const { width, height } = useWindowDimensions();

  const confirmInputHandler = () => {
    const number = parseInt(enteredNumber);

    if (isNaN(number) || number <= 0 || number > 99) {
      Alert.alert(
        "Invalid Number!",
        "Please choose a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    onPickNumber(number);
    // console.log("valid num");
  };

  return (
    // a problem we may get is for keyboards. In android, generally we dont face
    // this problem because keyboard is closable. However, for iPhone, keyboard
    // is not closable. Thus, in landscape mode, when we opne the keybaord
    // (typing in the input), the app breaks becasue we cant close the keyboard
    // Thus, we use KeyboardAvodingView which basically pushes all the content
    // up when keyboard is opened. Furthermore, we wrap it into a scrollview
    // such that we can scroll around even when keybaord is open
    // Thus, this will allow us to click the confirm button when in ios
    // and we can even scroll around the app.
    // We dont face this issue in android.
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        {/* // Note: we cant do the dimensions API and put it below the component //
      this is because it only runs once. i.e. once component is rendered. //
      however, if we rotate our device, since it is not within our component //
      it will not respond to the change. Thus, we use the useWindowDimensions
      hook // instead and place it in our component so when we rotate, // our
      code changes accordingly */}
        <View
          style={[styles.rootContainer, { marginTop: height < 400 ? 20 : 100 }]}
        >
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter A Number</InstructionText>
            {/* Note: if it is a number, we do maxLength={2} which makes it 2 digits only
      If it is a string, we can do maxLength="2" which means it is 2 characters only */}
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              value={enteredNumber} // 2 way binding
              // onChange vs onChangeText ?
              onChangeText={numberInputHandler}
              // by default, the normal keyboard is chosen, here, we
              // make the numberpad keyboard appear instead when we click on the text field
              keyboardType="number-pad"
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // rmember, by default, alignItems is streched. Hence, we can use center to make it not strech
    alignItems: "center",
  },

  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
