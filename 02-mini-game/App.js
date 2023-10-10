import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";

export default function App() {
  return (
    // styling for the root screen; subsequent screens will have this background ( i think)
    <LinearGradient style={styles.rootScreen} colors={["#36021c", "#ddb52f"]}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <StartGameScreen />
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
