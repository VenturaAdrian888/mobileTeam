import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";

import {firebase} from "./config";

import Login from "./src/Login";
import Regsiter from "./src/Regsiter";
import Dashboard from "./src/Dashboard";
import HeaderLogin from "./components/HeaderLogin";
import HeaderMain from "./components/HeaderMain";

const Stack = createStackNavigator();

function App(){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  },[]);

  if(initializing) return null;

  if(!user){
    return(
      <Stack.Navigator>
        <Stack.Screen 
        name="Login" 
        component={Login}
        options={{
          headerTitle: () => <HeaderLogin name="LOGIN"/>,
          headerStyle: {
            height:150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius:50,
            backgroundColor: '#00e4d0',
            shadowColor: '#000',
            elevation: 25
          }

        }}
        
        />
        <Stack.Screen 
          name="Register" 
          component={Regsiter}
          options={{
            headerTitle: () => <HeaderLogin name="Register"/>,
            headerStyle: {
              height:150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius:50,
              backgroundColor: '#00e4d0',
              shadowColor: '#000',
              elevation: 25
            }
          }}
          />
      </Stack.Navigator>
    );
}
return(
  <Stack.Navigator>
    <Stack.Screen 
      name="Dashboard" 
      component={Dashboard}
      options={{
        headerTitle: () => <HeaderMain name="DASHBOARD"/>,
        headerStyle: {
          height:150,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius:50,
          backgroundColor: '#00e4d0',
          shadowColor: '#000',
          elevation: 25
        }

      }}
      
      />
  </Stack.Navigator>
)
    }
export default () => {
  return(
    <NavigationContainer>
    
      <App/>
      
    </NavigationContainer>
  )
}
