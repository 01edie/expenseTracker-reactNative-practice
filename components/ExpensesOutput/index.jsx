import moment from "moment/moment";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { expensesSlice } from "../../store/expensesSlice";
import { GlobalStyles } from "../../Styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";


const DummyData = [
    {
        id:'test1',
        description:'Mobile Bill',
        amount:109,
        date: moment('2023-02-25')
    },
    {
        id:'test2',
        description:'Temporary transport',
        amount:210,
        date: moment('2023-02-20')
    },
    {
        id:'test3',
        description:'Tour',
        amount:2000,
        date: moment('2023-02-22')
    },
    // {
    //     id:'test4',
    //     description:'Domain fee',
    //     amount:1200,
    //     date: moment('2023-02-27')
    // },
    // {
    //     id:'test5',
    //     description:'Registration fee @something',
    //     amount:350,
    //     date: moment('2023-02-24')
    // },
    // {
    //     id:'test6',
    //     description:'Mobile Bill',
    //     amount:109,
    //     date: moment('2023-02-25')
    // },
    // {
    //     id:'test7',
    //     description:'Temporary transport',
    //     amount:210,
    //     date: moment('2023-02-20')
    // },
    // {
    //     id:'test8',
    //     description:'Tour',
    //     amount:2000,
    //     date: moment('2023-02-22')
    // },
    // {
    //     id:'test9',
    //     description:'Domain fee',
    //     amount:1200,
    //     date: moment('2023-02-27')
    // },
    // {
    //     id:'test10',
    //     description:'Registration fee @something',
    //     amount:350,
    //     date: moment('2023-02-24')
    // },
    // {
    //     id:'test11',
    //     description:'Mobile Bill',
    //     amount:109,
    //     date: moment('2023-02-25')
    // },
    // {
    //     id:'test12',
    //     description:'Temporary transport',
    //     amount:210,
    //     date: moment('2023-02-20')
    // },
    // {
    //     id:'test13',
    //     description:'Tour',
    //     amount:2000,
    //     date: moment('2023-02-22')
    // },
    // {
    //     id:'test14',
    //     description:'Domain fee',
    //     amount:1200,
    //     date: moment('2023-02-27')
    // },
    // {
    //     id:'test15',
    //     description:'Registration fee @something',
    //     amount:350,
    //     date: moment('2023-02-24')
    // },
]


function ExpensesOutput({expenses,periodDetails}) {
    const expensesNow = useSelector((state)=>state)
    console.log(expensesNow)
  return <View style={styles.root}>
    <ExpensesSummary expenses={expensesNow} periodDetails={periodDetails}/>
    <ExpensesList expenses={expensesNow} />
  </View>;
}

export default ExpensesOutput;

const styles= StyleSheet.create({
    root:{
        flex:1,
        backgroundColor: GlobalStyles.colors.primary100
    }
})
