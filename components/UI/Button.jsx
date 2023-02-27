import { View, Text, StyleSheet, Pressable } from "react-native";

function Button({ children, onPress,color,mode }) {
  return (
    <View style={styles.buttonViewOuter}>
      <Pressable
        android_ripple={{ color: "#5f1277" }}
        style={({pressed})=>pressed?[styles.pressed]:null}
        onPress={onPress}
      >
        <View style={mode==='contained'?[styles.buttonViewInner,{backgroundColor: color}]:[styles.buttonViewInner,{borderColor: color, borderWidth:2}]}>
        <Text style={mode==='contained'?styles.buttonText:{...styles.buttonText, color:color}}>{children}</Text>
        </View>
        
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonViewOuter: {
    borderRadius: 5,
    overflow: "hidden",
    margin:4
  },
  buttonViewInner: {
    
    paddingHorizontal: 18,
    paddingVertical: 8,
    // elevation: 10,
    minWidth:100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  pressed:{
    opacity:0.75,
    elevation:0
  }
});