import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "./src/Home";
import { NavigationContainer } from "@react-navigation/native";
import DetailScreen from "./src/Details";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={HomeScreen}
        />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};