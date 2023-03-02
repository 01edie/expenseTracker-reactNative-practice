import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../Styles";

function ExpensesSummary({ periodDetails, expenses }) {
  const totalExpense = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodDetails}</Text>
      <Text style={styles.amount}>₹{totalExpense}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical:8,
    // marginTop:1,
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colors.primary75,
  },
  period: {
    fontSize:16,
  },
  amount: {
    fontWeight: "bold",
  },
});
