import { View, Text } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput"


function RecentExpenses() {
return <ExpensesOutput periodDetails='Last 7 days' />
}


export default RecentExpenses