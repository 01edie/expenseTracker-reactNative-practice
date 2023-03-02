import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    //   console.log(jsonValue)
    await AsyncStorage.setItem("@storage_exp", jsonValue);
  } catch (e) {
    Alert.alert("Error", "Saving data to source failed");
  }
};


let initialState = [];

export const expensesSlice = createSlice({
  name: "expensesSlice",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const finalValue = [action.payload, ...state];
      storeData(finalValue);
      return finalValue;
    },
    updateExpense: (state, action) => {
      const newData = state.filter(
        (expense) => expense.id !== action.payload.id
      );
      const finalValue = [action.payload, ...newData];
      storeData(finalValue);
      return finalValue;
    },
    deleteExpense: (state, action) => {
      const newData = state.filter(
        (expense) => expense.id !== action.payload.id
      );
      storeData(newData);
      return newData;
    },
    initiateData: (state, action) => {
      return action.payload
    },
   
  },
});

export const {
  addExpense,
  updateExpense,
  deleteExpense,
  initiateData,
 
} = expensesSlice.actions;
export default expensesSlice.reducer;
