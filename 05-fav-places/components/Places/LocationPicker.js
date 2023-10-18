import { useEffect, useState } from "react";
import { Alert, View, StyleSheet, Image, Text } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import { getAddress, getMapPreview } from "../../util/location";

function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState();
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        try {
          const address = await getAddress(
            pickedLocation.lat,
            pickedLocation.lng
          );
          onPickLocation({ ...pickedLocation, address: address });
        } catch (err) {
          console.log("err occured");
          console.log(err);
        }
      }
    }

    handleLocation();
  }, [pickedLocation, onPickLocation]);

  async function verifyPermissions() {
    if (locationPermissionInformation.status !== PermissionStatus.GRANTED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    // get location natively based on phone's location
    // note, we can have many options in getCurrentPositionAsync({...})
    // if we want, check docs for more details.
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  async function pickOnMapHandler() {
    const hasPermission = await verifyPermissions();

    // if dont have permissions, we just navigate to the Map screen
    // it will then just use a default fallback location as per the code
    // in Map.js
    console.log("pemrissions: ", hasPermission);
    if (!hasPermission) {
      navigation.navigate("Map");
      return;
    }

    // but, if we have permissions, we get the current location of the
    // phone and set the initial coordinates on the map as the current location
    const location = await getCurrentPositionAsync();
    navigation.navigate("Map", {
      initialLat: location.coords.latitude,
      initialLng: location.coords.longitude,
    });
  }

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    // borderRadius: 4
  },
});
