import { useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const closeModal = () => setModalIsVisible(false);

  const addGoalHandler = (enteredGoalText) => {
    // console.log(enteredGoalText); // appears in the terminal if logged
    setCourseGoals((prev) => [
      ...prev,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    closeModal();
  };

  const deleteGoalHandler = (id) => {
    setCourseGoals((prev) => {
      return prev.filter((goal) => goal.id !== id);
    });
  };
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="purple"
          onPress={() => setModalIsVisible(true)}
        />
        {modalIsVisible && (
          <GoalInput
            onAddGoal={addGoalHandler}
            visible={modalIsVisible}
            closeModal={closeModal}
          />
        )}

        <View style={styles.goalsContainer}>
          {/* Put a ScrollView to ensure that the goals are scrollable
        Note that we should put a <View> then <ScrollView> instead of just doing a <ScrollView>
        because this will cause styling issues. In this way, the outer <view> controls
        how much space it takes and the scrollview only makes sure that content is scrollable */}
          {/* A better alternative to ScrollView when we have potentially infinite data is FlatList. This is beccause FlatList only renders items that can be seen and renders the rest when needed. ScrollView on the other hand renders everything even those that cant be seen and this is costly to performance. */}
          <FlatList
            alwaysBounceVertical={false}
            data={courseGoals}
            keyExtractor={(item) => {
              return item.id; // sets the key for each rendered item as .id
            }}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                  id={itemData.item.id}
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // Note: we can change some global styles in app.json
  // for example, we have set "backgroundColor": "#1e085a",   in app.json
  // and this makes all backgroundColors of the main screens black-ish (excluding modals)

  appContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16, //as in 16 px
  },
  goalsContainer: {
    flex: 5,
  },
});
