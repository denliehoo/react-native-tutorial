# mini-game

A slightly more complicated app; Guess my number app

## orientation

- Note that we can change orientation of the device in app.json
- By default, when creating a react native expo app, orientation is locked to "potrait"
- We can instead, change it to "default" which will change the app to lanscape or portrait depnding on phone's oreitnation. Furthmore, we can also lock to "landscape" if we want
- For responsive styles, we have two options:
  1. Dimensions API (check Card.js) - when we use this, we generally define it after our component and place it in our styles, thus we are locked in. Since the code only runs once. Use this if we are ok with not having responsiveness (e.g. when our screen rotates)
  2. useWindowDimensions hook (Check StartGameScreen.js) - used in the component and then, we can dynmically add our styles inline. Useful for when we need responsiveness (e.g. screen rotation)

# differen OS

- We can use Platform API to see which platform we are using to change the code accordingly, specially Platform.OS (check Title.js)
- For example, we can do something like this in our styles: borderWidth: Platform.OS === "android" ? 2 : 0,
- Note that we have a few options for OS such as "ios" | "android" | "windows" | "macos" | "web", but if we are just making a cross platform mobile app, we can just assume android and ios
- Alternatively ,we can use Platform.select, for example, borderWidth: Platform.select({ android: 2, ios: 0 }),
- One more alternative is to make platform specific files for a component. For example, for Title.js, we can have 2 files instead - Title.adroid.js and Title.ios.js (instead of having 1 Title.js)
  - Then, we can just import Title.js (dont need specific android or ios) in the place we are using it and the system will automatically use the .adroid or .ios variant accordingly.
- Reference: https://nlbsg.udemy.com/course/react-native-the-practical-guide/learn/lecture/31197618#questions/17391090
