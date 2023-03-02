import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";


import ExpensesOutput from "../components/ExpensesOutput";



function RecentExpenses() {
   
  const expenses = useSelector((state) => state)?.map((e) => ({
    ...e,
    date: moment(`${e.date} ${e.time}`, "DD-MM-YYYY HH:mm"),
  })).filter((e)=>moment(e.date).isAfter(moment().subtract(7,'days'),'day'));

  return <ExpensesOutput periodDetails="Last 7 days" expenses={expenses} />;
}

export default RecentExpenses;
