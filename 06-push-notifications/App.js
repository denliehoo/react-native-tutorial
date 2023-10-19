import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View, Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";

// this handelr specifies how notifications should be handled by our device
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      // these 3 are compulsary configurations we must set
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    async function configurePushNotifications() {
      // gets the permission
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;
      console.log("permission status: ", status);

      // ask for permission of not granted
      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Push notifications need the appropriate permissions."
        );
        return;
      }

      console.log("fetching push token data....");
      const pushTokenData = await Notifications.getExpoPushTokenAsync({
        projectId: "PROJECTIDHERE",
      });
      console.log(pushTokenData);

      // only needed for android; sets the importance of the notification
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    // addNotificationReceivedListener is triggered whenever a
    // notification is received
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("NOTIFICATION RECEIVED");
        console.log(notification);
        const userName = notification.request.content.data.userName;
        console.log(userName);
      }
    );

    // conversely, addNotificationResponseReceivedListener is triggered ONLY
    // when user clicks on the notification
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("NOTIFICATION RESPONSE RECEIVED");
        console.log(response);
        // extracts the data that was sent in the notification and we can handle
        // it accordingly
        const userName = response.notification.request.content.data.userName;
        console.log(userName);
      }
    );
    // clean up function to prevent memory leaks
    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification",
        body: "This is the body of the notification.",
        // all these data can later be extracted when we handle the incoming notification
        // for example, when user clicks on the notification and they get directed to our app
        // we can extract the data accordingly
        data: { userName: "Max" },
        // more configurable content is available; check docs for more
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  // SENDS A PUSH NOTIFCATION. FOR MORE DETAILS: https://nlbsg.udemy.com/course/react-native-the-practical-guide/learn/lecture/31894942#overview
  function sendPushNotificationHandler() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // in production, device token should be fetched from a database and it shouldn't be hardcoded
        to: "<Your Device Push Token>]",
        title: "Test - sent from a device!",
        body: "This is a test!",
      }),
    });
  }

  return (
    <View style={styles.container}>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
      <Button
        title="Send Push Notification"
        onPress={sendPushNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// import { StatusBar } from "expo-status-bar";
// import { Alert, Button, StyleSheet, Text, View } from "react-native";
// import * as Notifications from "expo-notifications";
// import { useEffect } from "react";

// // this handelr specifies how notifications should be handled by our device
// Notifications.setNotificationHandler({
//   handleNotification: async () => {
//     return {
//       // these 3 are compulsary configurations we must set
//       shouldPlaySound: false,
//       shouldSetBadge: false,
//       shouldShowAlert: true,
//     };
//   },
// });

// export default function App() {
//   useEffect(() => {
//     // addNotificationReceivedListener is triggered whenever a
//     // notification is received
//     const subscription1 = Notifications.addNotificationReceivedListener(
//       (notification) => {
//         console.log("sub1", notification);
//         const data = notification.request.content.data;
//         console.log("sub1 received data", data);
//         console.log("sub1 userName: ", data.userName);
//       }
//     );

//     // conversely, addNotificationResponseReceivedListener is triggered ONLY
//     // when user clicks on the notification
//     const subscription2 = Notifications.addNotificationResponseReceivedListener(
//       (response) => {
//         console.log("sub2 response", response);
//         // extracts the data that was sent in the notification and we can handle
//         // it accordingly
//         console.log(
//           "sub2 response data",
//           response.notification.request.content.data
//         );
//         console.log(
//           "sub2 username",
//           response.notification.request.content.data.userName
//         );
//       }
//     );
//     // clean up function to prevent memory leaks
//     return () => {
//       subscription1.remove();
//       subscription2.remove();
//     };
//   }, []);

//   useEffect(() => {
//     const getPushToken = async () => {
//       const settings = await Notifications.getPermissionsAsync();
//       const isGranted = settings.granted;
//       if (!isGranted) {
//         // alternatively can call the getPermissions method here instead of just an Alert
//         Alert.alert(
//           "Permissions not granted",
//           "Please approve permissions first"
//         );
//         return;
//       }

//       const pushTokenData = await Notifications.getExpoPushTokenAsync();
//       console.log("pushToken: ", pushTokenData);
//     };
//     getPushToken();
//   }, []);

//   const permissionsHandler = async () => {
//     const settings = await Notifications.getPermissionsAsync();

//     const isGranted = settings.granted;
//     if (isGranted) {
//       Alert.alert(
//         "Permission has already been granted!",
//         "You can receive notifications"
//       );
//     } else {
//       const request = await Notifications.requestPermissionsAsync();

//       if (request.granted) {
//         Alert.alert(
//           "You have granted permissions",
//           "You can now receive notifications"
//         );
//       } else {
//         Alert.alert(
//           "You did not grant permissions",
//           "You will be unable to receive notifications"
//         );
//       }
//     }
//   };
//   const scheduleNotificationHandler = () => {
//     console.log("sendnoti");
//     Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Local Notification",
//         body: "Body of notification; the details",
//         // all these data can later be extracted when we handle the incoming notification
//         // for example, when user clicks on the notification and they get directed to our app
//         // we can extract the data accordingly
//         data: {
//           userName: "UserNameHere",
//         },
//         // more configurable content is available; check docs for more
//       },
//       trigger: {
//         seconds: 2,
//       },
//     });
//   };
//   return (
//     <View style={styles.container}>
//       <StatusBar style="auto" />
//       <View style={{ marginBottom: 20 }}>
//         <Button
//           title="Check Or Approve Permissions For Notifications"
//           onPress={permissionsHandler}
//         />
//       </View>
//       <Button
//         title="Schedule Notification"
//         onPress={scheduleNotificationHandler}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
