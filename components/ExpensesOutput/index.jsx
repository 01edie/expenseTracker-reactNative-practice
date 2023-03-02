import moment from "moment/moment";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { expensesSlice } from "../../store/expensesSlice";
import { GlobalStyles } from "../../Styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";




function ExpensesOutput({expenses,periodDetails}) {
    
  return <View style={styles.root}>
    <ExpensesSummary expenses={expenses} periodDetails={periodDetails}/>
    <ExpensesList expenses={expenses} />
  </View>;
}

export default ExpensesOutput;

const styles= StyleSheet.create({
    root:{
        flex:1,
        backgroundColor: GlobalStyles.colors.primary100
    }
})
