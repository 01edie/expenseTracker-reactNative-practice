import moment from "moment";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

import ExpensesOutput from "../components/ExpensesOutput";


function AllExpenses() {
  const expenses = useSelector((state) => state).map((e) => ({
    ...e,
    date: moment(`${e.date} ${e.time}`, "DD-MM-YYYY HH:mm"),
  }));

  return <ExpensesOutput periodDetails="Total" expenses={expenses} />;
}

export default AllExpenses;
