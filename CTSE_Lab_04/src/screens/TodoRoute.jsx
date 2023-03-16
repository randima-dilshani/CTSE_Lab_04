import { firebase } from "../../firebase/firebase.config";

const todoRef = firebase.firestore().collection("todos");

//add todo
const addTodo = async (todo) => {
  const newTodo = await todoRef.add({
    title: todo.title,
    isDone: todo.isDone,
  });
  return newTodo;
};

//get all todos
const fIndAllTodos = async () => {
  const snapshot = await todoRef.get();
  const todos = [];
  snapshot.forEach((doc) => {
    todos.push({
      id: doc.id,
      title: doc.data().title,
      isDone: doc.data().isDone,
    });
  });

  return todos;
};

//delete todo
const deleteTodoById = async (id) => {
  return await todoRef.doc(id).delete();
};

//update isDone status
const updateIsDoneStatus = async (id, isDone) => {
  const todo = await todoRef.doc(id).update({ isDone: isDone });
  return todo;
};

//get todo by id
const findTodoById = async (id) => {
  const todo = await todoRef.doc(id).get();
  return todo;
};

//find todo by id and update todo
const updateTodoById = async (id, todo) => {
  const updatedTodo = await todoRef.doc(id).update(todo);
  return updatedTodo;
};

export {
  addTodo,
  fIndAllTodos,
  deleteTodoById,
  updateIsDoneStatus,
  findTodoById,
  updateTodoById,
};
