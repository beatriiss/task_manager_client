import "react-native-gesture-handler";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import Login from "./screens/login";
import Cadastro from "./screens/cadastro";
import Dashboard from "./screens/dashboard";
import Add_task from "./screens/add_task";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/auth_context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const { currentUser} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Login"}>
        {currentUser ?
          <>

            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{ title: null, headerShown: false }}
            />
            <Stack.Screen
              name="Add_task"
              component={Add_task}
              options={{ title: null, headerShown: false }}
            />
          
          </>
          :
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: null, headerShown: false }}
            />

            <Stack.Screen
              name="Cadastro"
              component={Cadastro}
              options={{ title: null, headerShown: false }}
            />

          </>
        }

      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
