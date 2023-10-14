import { StyleSheet, Text, View } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";
/*
  similar to the navigation prop, screens that are used in the
  <Stack.Screen> component in app.js will also receive a route prop 
  route furthermore gets params which can get the params we
  passed through navigation from the CategoriesScreen.js
*/

const MealsOverviewScreen = ({ route, navigation }) => {
  // could use const route = useRoute() instead
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  // set the title for the screen
  // (can also be done from the <Stack.Screen /> in app.js instead)
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);

  return <MealsList items={displayedMeals} />;
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({});
