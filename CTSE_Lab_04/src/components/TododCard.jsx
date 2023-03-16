import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import CheckBox from "react-native-check-box";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  deleteTodoById,
  updateIsDoneStatus,
} from "../screens/TodoRoute";

const TodoCard = ({ todo }) => {
    const navigation = useNavigation();
  
    const DeleteTodo = async (id) => {
      await deleteTodoById(id);
  
      Alert.alert("Success Message", "Todo deleted successfully", [
        {
          text: "OK",
          onPress: () => {
            navigation.push("Todo");
          },
        },
      ]);
    };
  
    const UpdateStatus = async (id, isdone) => {
      var newIsDone;
      if (isdone) {
        newIsDone = false;
      } else {
        newIsDone = true;
      }
  
      await updateIsDoneStatus(id, newIsDone);
  
      Alert.alert("Success Message", "Todo status updated successfully", [
        {
          text: "OK",
          onPress: () => {
            navigation.push("Todo");
          },
        },
      ]);
    };
    return (
      <View style={styles.container}>
        <CheckBox
          checkedCheckBoxColor="green"
          onClick={() => {
            UpdateStatus(todo.id, todo.isDone);
          }}
          isChecked={todo.isDone}
        />
  
        <Text>{todo.title}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.push("TodoUpdate", {
                id: todo.id,
              })
            }
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => DeleteTodo(todo.id)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      padding: "5%",
      marginBottom: "2%",
      borderRadius: 10,
      marginTop:"10%",
      backgroundColor: "#EABABA",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "35%",
    },
  
    deleteButton: {
      backgroundColor: "red",
      borderRadius: 10,
      width: "55%",
      height: 35,
      marginLeft:10,
      justifyContent: "center",
      alignItems: "center",
    },
    editButton: {
      backgroundColor: "#B4EECC",
      borderRadius: 10,
      width: "55%",
      height: 35,
      marginLeft:-10,
      justifyContent: "center",
      alignItems: "center",
    },
    deleteButtonText: {
      color: "white",
      fontWeight: "bold",
    },
    editButtonText: {
      color: "white",
      fontWeight: "bold",
    },
  });
  export default TodoCard;
  