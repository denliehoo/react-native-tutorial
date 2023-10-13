import { StyleSheet, Text, View } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { FlatList } from "react-native";
import MealItem from "../components/MealItem";
import { useLayoutEffect } from "react";
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

  const renderMealItem = (itemData) => {
    const item = itemData.item;

    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };
    // destructure the props; we can do this instead of doing
    // title={item.title} imageUrl: item.url and so on...
    return <MealItem {...mealItemProps} />;
  };

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

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
