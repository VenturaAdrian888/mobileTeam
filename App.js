import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";

import { firebase } from "./config";

import Login from "./src/Login";
import Register from "./src/Register";
import Dashboard from "./src/Dashboard";
import HeaderMain from "./components/HeaderMain";

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }} />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerTitle: () => <HeaderMain name="Register" />,
            headerStyle: {
              height: 100,
              backgroundColor: 'white',
            }
          }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false
        }}

      />
    </Stack.Navigator>
  )
}
export default () => {
  return (
    <NavigationContainer>

      <App />

    </NavigationContainer>
  )
}
