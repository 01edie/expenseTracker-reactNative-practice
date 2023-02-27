import moment from "moment";
import { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "../store/expensesSlice";
import { GlobalStyles } from "../Styles";

function ManageExpense({ navigation, route }) {
  const dispatch = useDispatch();
  const expensesData = useSelector((state) => state);
  const expenseId = route.params?.expenseId;
  const expenseData = expensesData.filter((e) => e?.id === expenseId);

  const isEditing = Boolean(expenseId);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  const submitHandler = () => {
    if (isEditing) {
      dispatch(
        updateExpense({
          id: "e356",
          description: "test description updated",
          amount: 968,
          date: "2022-02-05",
        })
      );
    } else {
      dispatch(
        addExpense({
          id: "e356",
          description: "test description",
          amount: 968,
          date: "2022-02-05",
        })
      );
    }
    navigation.goBack();
  };

  function deleteHandler() {
    dispatch(deleteExpense({id:expenseId}))
    navigation.goBack();
  }

  const cancelHandler = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {isEditing?<View style={styles.deleteContainer}>
        <IconButton
          onPress={deleteHandler}
          icon="trash"
          color={GlobalStyles.colors.error500}
          size={24}
        />
      </View>:null}
      <View>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          {isEditing ? expenseData[0].description : null}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color={GlobalStyles.colors.primary700}
          onPress={submitHandler}
          mode="contained"
        >
          {isEditing ? "Update" : "Add"}
        </Button>
        <Button color={GlobalStyles.colors.primary700} onPress={cancelHandler}>
          Cancel
        </Button>
      </View>
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary75,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 24,
    alignItems: "center",
  },
  deleteContainer: {
    alignItems: "flex-end",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
});
