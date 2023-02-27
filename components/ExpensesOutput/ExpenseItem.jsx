import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { GlobalStyles } from "../../Styles";

const ExpenseItem = ({ description, date, amount, id }) => {
  const navigation = useNavigation();
  function manageItem() {
    navigation.navigate("manage", {
      expenseId: id,
    });
  }
  return (
    <View style={styles.outer}>
      <Pressable
        android_ripple={{ color: "#fff" }}
        style={({ pressed }) => (pressed ? styles.lessOpacity : null)}
        onPress={manageItem}
      >
        <View style={styles.inner}>
          <View style={styles.descriptionBlock}>
            <Text
              style={[
                styles.textBase,
                { fontWeight: "bold", color: "#BFB3B3" },
              ]}
            >
              {description}
            </Text>
            <Text style={styles.textBase}>
              {moment(date).format("HH:MM , Do MMM, YYYY")}
            </Text>
          </View>
          <View style={styles.amountBlock}>
            <Text style={styles.amountText}>{amount}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  outer: {
    backgroundColor: GlobalStyles.colors.primary500,
    marginTop: 6.5,
    marginHorizontal: 10,
    borderRadius: 4,
    overflow: "hidden",
    elevation: 4,
  },
  inner: {
    // paddingHorizontal:24,
    // paddingVertical:8,
    // backgroundColor: GlobalStyles.colors.primary500,
    // margin:5

    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  descriptionBlock: {
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  amountBlock: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    minWidth: 70,
    borderRadius: 4,
    alignItems: "center",
  },
  amountText: {
    color: GlobalStyles.colors.primary700,
    // color:'#fff',
    fontWeight: "bold",
  },
  textBase: {
    // color:'#efefef',
    color: "#9D9D9D",
  },
  lessOpacity: {
    opacity: 0.5,
  },
});
