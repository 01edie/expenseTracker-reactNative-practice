import React from "react";
import { FlatList, View, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderListItem(dataItem) {
  return <ExpenseItem {...dataItem.item}  />
  
}

function ExpensesList({expenses}) {
  return <FlatList showsVerticalScrollIndicator={false} data={expenses} style={{marginBottom:2}} renderItem={renderListItem} keyExtractor={(item)=>item.id} />;
}

export default ExpensesList;
