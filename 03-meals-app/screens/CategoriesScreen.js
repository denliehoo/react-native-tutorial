import { StyleSheet, Text, View } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import { FlatList } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";

// Because this is used as a <Sctack.Screen /> component in app.js,
// we will have a special prop provided by react navigation called: navigation
// for the screen
const CategoriesScreen = ({ navigation }) => {
  // could you const navigation = useNavigation() instead
  const renderCategoryItem = (itemData) => {
    const pressHandler = () => {
      // .navigate takes 2 params
      // the first is the screen name to navigate 2,
      // the second is an object of params that we might want to pass during navigation
      // to the screen to be loaded
      navigation.navigate("MealsOverview", { categoryId: itemData.item.id });
    };
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  };

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2} // changes the list to 2 columns
    />
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
