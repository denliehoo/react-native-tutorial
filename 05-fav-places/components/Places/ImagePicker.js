import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.GRANTED)
      return true;

    // as long as permission not granted, we ask for permission!
    const permissionResponse = await requestPermission();
    const isGranted = permissionResponse.granted;
    if (isGranted) return true;

    Alert.alert(
      "Insufficient Permissions!",
      "You need to grant camera permissions to use this app."
    );
    return false;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    // launches the camera
    const image = await launchCameraAsync({
      // optional options below to better suit our needs for the app:
      // we can check docs for more options
      // allow user to edit photo before submitting
      allowsEditing: true,
      // sets the aspect ratio
      aspect: [16, 9],
      // lower quality resolution
      quality: 0.5,
    });

    const imageUri = image.assets[0].uri;

    setPickedImage(imageUri);
    onTakeImage(imageUri);
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
