import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import TodoCard from "../components/TododCard";
import { addTodo, fIndAllTodos } from "./TodoRoute";

export default function TodoScreen() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const navigation = useNavigation();

  const GetAllTodos = async () => {
    try {
      const data = await fIndAllTodos();
      setTodos(data);
    } catch (e) {
      console.log(e);
    }
  };

  const AddNewTodo = async () => {
    const todo = {
      title: title,
      isDone: false,
    };

    try {
      await addTodo(todo);

      Alert.alert("Success Message", "Todo added successfully", [
        {
          text: "OK",
          onPress: () => {
            navigation.push("Todo");
          },
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    GetAllTodos();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        {todos.map((todo) => (
          <TodoCard todo={todo} />
        ))}
      </ScrollView>
      <View style={styles.textBoxContainer}>
        <TextInput
          style={styles.textBox}
          placeholder="Add a New Todo"
          onChangeText={(text) => setTitle(text)}
        />
        <TouchableOpacity style={styles.button} onPress={AddNewTodo}>
          <Text style={styles.buttonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "4%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F0A681",
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
  },

  scrollViewContainer: {
    marginTop: "10%",
    width: "100%",
    height: "90%",
  },

  textBoxContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "10%",
  },
  textBox: {
    width: "70%",
    height: 45,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth:1,
    paddingLeft: 10,
  },

  button: {
    width: "25%",
    borderRadius: 10,
    backgroundColor: "#D0F0F1",
    height: 45,
    borderWidth:1,
    borderColor:"#9E4638",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
});
