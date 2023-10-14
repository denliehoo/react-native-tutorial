# meals app

- Meals app
- primary focus is on navigation (i.e. going from one screen to another, and also back, etc) using React Navigation
- https://reactnavigation.org/docs/getting-started
- https://reactnavigation.org/docs/native-stack-navigator/ [Note: there are other navigators that we can explore in the Navigators tab for the docs like Drawer, Bottom Tab, etc]
- npm install @react-navigation/native
- if we want to use stack for navigation
  - npm install @react-navigation/native-stack
- if we want to use the drawer for navigation:

  - npm install @react-navigation/drawer

- and also, since we are using expo, we also need to install these dependencies; consult the docs for more details/updated info:
- for native-stack:
  - npx expo install react-native-screens react-native-safe-area-context
- for drawer:

  - npx expo install react-native-gesture-handler react-native-reanimated

- Note: the navigator provides some utilities by default and it will be coded into our project automatically. For example, for native-stack, we will get a header with the screen name and even a back button on the top. And then for Drawer, we will get a header with the hamburger icon of which we can click that opens a drawer and we can navigate around with that along with the screen name. Explore docs for more.

  - Regardless of which navigator we use, the GENERAL usage and principle of it is similar (e.g. options and screen options, how to use it in App.js for navigation, route and navigation prop and hook, etc...). Furthermore, we can actually combine the navigators if we want to use a few different type (e.g. using stack and drawer navigator)

- Key Concepts include:

  - createNativeStackNavigator, NavigationContainer (check app.js)
  - navigating and passing params through navigation through the navigate prop(check CategoriesScreen.js) [https://reactnavigation.org/docs/route-prop/]
  - and then accepting the params that was passed through params(check MealsOverviewScreen) [https://reactnavigation.org/docs/navigation-prop/]
  - Alternative, we can use useNavigation() and useRoute() within the definition of our component and it works the same way as the navigation and route prop; i.e. we can do something like: (check MealItem.js and MealDetail.js)

    ```Javascript
        const ComponentName = () =>{
            const navigation = useNavigation()
            const route = useRoute()


            return <View>...</View>
        }
    ```

  - Styling of the default header and title for the navigation using options prop in Stack.Screen for app.js which will do styling for individual screen OR screenOptions prop in Stack.Navigator which does styling for ALL the screens
  - Nesting navigators (e.g. using both a stack navigator and a drawer navigator)
  - Using context API to do global state management
