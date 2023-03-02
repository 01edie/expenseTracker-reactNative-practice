import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ToastAndroid } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { Input } from "@rneui/themed";
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "../store/expensesSlice";
import { GlobalStyles } from "../Styles";

function ManageExpense({ navigation, route }) {
  const dispatch = useDispatch();
  const expensesData = useSelector((state) => state);
  
  const [formData, setFormData] = useState({
    amount: "",
    date: moment().format("DD-MM-YYYY"),
    time: moment().format("HH:mm"),
    description: "",
  });
  const [errorData, setErrorData] = useState();

  const expenseId = route.params?.expenseId;
  const expenseData = expensesData.filter((e) => e?.id === expenseId);
  
  // {
  //   amount:null,
  //   date:null,
  //   time: null,
  //   description:null
  // }

  const isEditing = Boolean(expenseId);
  useEffect(()=>{
    if(isEditing){
      setFormData(expenseData[0])
    }
  },[isEditing])
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  function deleteHandler() {
    dispatch(deleteExpense({ id: expenseId }));
    ToastAndroid.showWithGravity(
      `${formData.description} deleted successfully`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    )
    navigation.goBack();
  }

  const cancelHandler = () => {
    navigation.goBack();
  };

  const amount = React.createRef();
  const date = React.createRef();
  const time = React.createRef();
  const description = React.createRef();

  function changeHandler(identifier, data) {
    setFormData((s) => ({
      ...s,
      [identifier]: data,
    }));
    if (identifier === "amount") {
      if (Number.isNaN(+data) || data < 0) {
        amount.current.shake();
        setErrorData((s) => ({ ...s, amount: "Please enter a valid value" }));
      } else {
        delete errorData?.amount;
      }
    }
    if (identifier === "date") {
      if (!moment(data, "DD-MM-YYYY").isValid()) {
        date.current.shake();
        setErrorData((s) => ({
          ...s,
          date: "Please enter a valid date in correct format",
        }));
      } else {
        delete errorData?.date;
      }
    }
    if (identifier === "time") {
      if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(data)) {
        time.current.shake();
        setErrorData((s) => ({ ...s, time: "Please enter a valid time" }));
      } else {
        delete errorData?.time;
      }
    }
  }

  const submitHandler = () => {
    let tmpFlag = false;
    Object.keys(formData).forEach((e) => {
      if (formData[e] === "") {
        if (!tmpFlag) {
          Alert.alert(`${e} required`, "Please enter a value");
          tmpFlag = true;
        }
      }
    });
    if (tmpFlag) {
      return;
    }
    if (formData)
      if (isEditing) {
        dispatch(
          updateExpense({
            id: expenseId,
           ...formData
          })
        )
        ToastAndroid.showWithGravity(
          `${formData.description} updated successfully`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        )
      } else {
        dispatch(
          addExpense({...formData,id:Math.ceil(Math.random()*1000)})
        );
        ToastAndroid.showWithGravity(
          `${formData.description} added successfully`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        )
      }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <View style={styles.deleteContainer}>
          <IconButton
            onPress={deleteHandler}
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={24}
          />
        </View>
      ) : null}
      <View style={styles.inputContainer}>
        <Input
          placeholder="Amount"
          selectionColor="green"
          // underlineColorAndroid="green"
          placeholderTextColor="green"
          // style={{color:'green',margin:16,borderColor:'green', borderWidth:1, paddingHorizontal:6}}
          // containerStyle={{backgroundColor:'green'}}
          keyboardType="number-pad"
          cursorColor="green"
          value={formData.amount}
          onChangeText={changeHandler.bind(this, "amount")}
          ref={amount}
          inputContainerStyle={{
            borderBottomColor: errorData?.amount ? "red" : "green",
          }}
          errorStyle={{ color: "red" }}
          errorMessage={errorData?.amount}
          style={{ color: errorData?.amount ? "red" : "#000" }}
        />
        <Input
          placeholder="Date (DD-MM-YYYY)"
          selectionColor="green"
          placeholderTextColor="green"
          cursorColor="green"
          value={formData.date}
          onChangeText={changeHandler.bind(this, "date")}
          ref={date}
          inputContainerStyle={{
            borderBottomColor: errorData?.date ? "red" : "green",
          }}
          errorStyle={{ color: "red" }}
          errorMessage={errorData?.date}
          style={{ color: errorData?.date ? "red" : "#000" }}
        />
        <Input
          placeholder="Time(HH:MM)"
          selectionColor="green"
          placeholderTextColor="green"
          cursorColor="green"
          value={formData.time}
          onChangeText={changeHandler.bind(this, "time")}
          ref={time}
          inputContainerStyle={{
            borderBottomColor: errorData?.time ? "red" : "green",
          }}
          errorStyle={{ color: "red" }}
          errorMessage={errorData?.time}
          style={{ color: errorData?.time ? "red" : "#000" }}
        />
        <Input
          placeholder="Description"
          selectionColor="green"
          placeholderTextColor="green"
          cursorColor="green"
          // multiline
          // numberOfLines={2}
          value={formData.description}
          onChangeText={changeHandler.bind(this, "description")}
          ref={description}
          inputContainerStyle={{
            borderBottomColor: errorData?.description ? "red" : "green",
          }}
          errorStyle={{ color: "red" }}
          errorMessage={errorData?.description}
          style={{ color: errorData?.description ? "red" : "#000" }}
        />
       
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
    borderBottomColor: GlobalStyles.colors.primary500,
    marginHorizontal:16
  },
  inputContainer: {
    margin: 24,
  },
});
