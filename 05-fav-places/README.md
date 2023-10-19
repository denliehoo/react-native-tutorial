# 05-fav-places

- Ensure to create a .env file with:

  ```Javascript
  EXPO_PUBLIC_GOOGLE_API_KEY=XXXXXXXGOOGLEMAPAPIKEYHERE
  ```

- Key concepts includes:
  - Using camera feature
    - We can use expo-camera for more complicated apps if we want more customisation[https://docs.expo.dev/versions/latest/sdk/camera/]
    - Or,if we just want something simple such as using on-device photo / launching the camera, we can just use expo-image-picker [https://docs.expo.dev/versions/latest/sdk/imagepicker/]. This is what the app uses whereby we just want to use the camera. (Check ImagePicker.js)
      - Detailed in instruction in the docs. But essentially, we need to firstly install the packages and then add it to app.json
  - Using location and maps (check LocationPicker.js)
    - Can use expo-location to get the user's current location [https://docs.expo.dev/versions/latest/sdk/location/]
    - Utilising react-native-maps (check Map.js). This utilises the local maps feature of the device. Thus, for android, it will be google maps and for ios it will be apple maps.
    - Using google maps api to pre-load a map image based on location and also to get the address of a location based on longtitude and latitude [note ensure to get API Key] (check location.js and LocationPicker.js)
    - Note: react-native-maps and expo-location is used as a native feature to display map/get location of device. On the other hand, google maps api is used to display an image of a map based on the location and also to get the ADDRESS based on the coordinates.
  - Using SQLite as a local database on the local device ONLY (alternative to using localStorage) [Note: the advantage of using SQLite is that we can store more complicated data structures as opposed to using a localStorage style which is just key and value which can be a string only] [https://docs.expo.dev/versions/latest/sdk/sqlite/]
  - Using environmental variables in react native [https://docs.expo.dev/guides/environment-variables/]; Note: variables must be EXPO_PUBLIC_NAMEHERE
