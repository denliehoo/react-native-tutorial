# 06-push-notifications

- app focuses on push notifications
- Local Notifications: notifications triggered by the installed app for the local device only. This is not sent to any other devices (e.g. other people). Notifications can be handled, scheduled or delivered from the device itself (no server needed) (use cases include reminders, etc)
- Push Notifications: allows us to push notifications to other devices to notify uses of something (e.g. usecase: marketing messages, messaging apps etc). Furthermore, we could send a push notification through our backened

  - For further clarification, lets say for a messaging app, we want our user to receive a notification when someone sends them a message. What happens is that A sends B a message and B receives a notification
  - Local notifications cannot achieve this purpose because A and B are 2 different devices. Local notification only works on the device itself
  - Instead, A sends a message to B, and somewhere along the process of sending the message, the backend takes note that A sent B a message, and then the backend notifys the push notification server (e.g. provided by Expo) to push a notification to B, thus B recevies the message AND the push notification.

- Key concepts includes:
  - Notifications (local) can be sent by using expo-notifications [https://docs.expo.dev/versions/latest/sdk/notifications/]
    - Ensure to add as a plugin in app.json
    - Note: we only need to add in the "expo-notifications" for the plugin; the other configurable details like icon, sound, etc is optional
    - More details here [https://docs.expo.dev/versions/latest/sdk/notifications/#app-config]
  - Push notifications can be sent by using expo-push-notifications [https://docs.expo.dev/push-notifications/overview/]. Note: push notifications can only be tested on real devices and not emulators
    - We can use expo push notification tester for testing push notification: https://expo.dev/notifications
