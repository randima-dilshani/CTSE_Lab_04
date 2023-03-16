import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import TodoScreen from "./src/screens/TodoScreen";
import TodoUpdateScreen from "./src/screens/TodoUpdateScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Todo"
          component={TodoScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="TodoUpdate"
          component={TodoUpdateScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
