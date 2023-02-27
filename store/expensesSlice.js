import { createSlice } from "@reduxjs/toolkit";

const initialState=[]

export const expensesSlice = createSlice({
    name:'expensesSlice',
    initialState,
    reducers:{
        addExpense:(state, action)=>{
            return [ action.payload,...state]
        },
        updateExpense:(state, action)=>{
            const newData = state.filter((expense)=>expense.id!==action.payload.id)
            return [ action.payload,...newData]
        },
        deleteExpense:(state, action)=>{
            const newData = state.filter((expense)=>expense.id!==action.payload.id)
            return newData
        }
    }
})

export const {addExpense, updateExpense, deleteExpense} = expensesSlice.actions
export default expensesSlice.reducer