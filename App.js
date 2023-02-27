import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import { GlobalStyles } from "./Styles";
import IconButton from "./components/UI/IconButton";
import { store } from "./store";


export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();


  function Tabs() {
    return (
      // Tabs

      <Tab.Navigator
        screenOptions={({navigation})=>({
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
            // borderBottomWidth:1,
            // borderColor:'#fff'
          },
          tabBarStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
            // borderTopColor: "#000",
            // borderTopWidth: 2,
          },
        
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          tabBarInactiveBackgroundColor: GlobalStyles.colors.primary600,
          tabBarActiveBackgroundColor: GlobalStyles.colors.primary500,
          headerRight:({tintColor})=><IconButton icon='add' size={32} color={tintColor} onPress={()=>navigation.navigate('manage')}/>
        })}
      >
        <Tab.Screen
          name="recent"
          options={{
            title: "Recent Expenses",
            tabBarLabel: "Recent",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="time-slot" size={size} color={color} />
            ),
           
            tabBarItemStyle: {
              padding: 3,
              // backgroundColor:'aqua'
              // backgroundColor:GlobalStyles.colors.primary400
            },
          }}
          component={RecentExpenses}
        />
        <Tab.Screen
          name="all"
          options={{
            title: "All Expenses",
            tabBarLabel: "All",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="google-wallet" size={size} color={color} />
            ),
            tabBarItemStyle: {
              padding: 3,

              // backgroundColor:'aqua'
              // backgroundColor: GlobalStyles.colors.primary300,
            },
            // tabBarInactiveBackgroundColor:GlobalStyles.colors.primary300
          }}
          component={AllExpenses}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
            borderBottomWidth:1,
            borderColor:'#fff'
          },
          // presentation:'modal',
          animation:'fade_from_bottom',
          // animationDuration:5
        }}>
          {/* Stacks */}

          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={Tabs}
          />
          <Stack.Screen
            name="manage"
            options={{
              title: "Manage Expense",
            }}
            component={ManageExpense}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
