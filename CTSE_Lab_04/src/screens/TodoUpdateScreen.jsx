import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { findTodoById, updateTodoById } from "./TodoRoute";
import { useNavigation } from "@react-navigation/core";

const TodoUpdateScreen = (props) => {
  const [title, setTitle] = useState("");

  var route = useRoute();
  const navigation = useNavigation();

  const id = route.params.id;

  const getTodoById = async (id) => {
    try {
      const todo = await findTodoById(id);
      setTitle(todo.data().title);
    } catch (e) {
      console.log(e);
    }
  };

  const updateTodo = async () => {
    const todo = {
      title: title,
      isDone: false,
    };

    try {
      await updateTodoById(id, todo);

      Alert.alert("Success Message", "Todo updated successfully", [
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
    getTodoById(id);
  }, []);

  return (
    <View style={styles.todoUpdateContainer}>
      <TextInput
        style={styles.inputField}
        onChangeText={(text) => setTitle(text)}
        value={title}
      />

      <TouchableOpacity onPress={updateTodo} style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoUpdateScreen;

const styles = StyleSheet.create({
  todoUpdateContainer: {
    flex: 1,
    backgroundColor: "lightblue",
    width: "100%",
    height: "100%",
    padding: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputField: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: "10%",
    marginBottom: "5%",
  },

  updateButton: {
    width: "50%",
    height: 50,
    backgroundColor: "blue",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  updateButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
