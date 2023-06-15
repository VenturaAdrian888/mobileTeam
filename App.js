import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Dashboard from "./screens/Dashboard";
import Profile from "./screens/Profile";
import SendCash from "./screens/SendCash";
import TransactionHistory from "./screens/TransactionHistory";
import CoinListScreen from "./screens/CoinList";
import Try from "./screens/Try";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TransactionListReceived from "./screens/TransactionListReceived";
import TransactionListSend from "./screens/TransactionListSend";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShadowVisible: false, headerTitle: "" }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShadowVisible: false, headerTitle: "" }}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShadowVisible: false,
            headerBackVisible: false,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => alert("This is profile button!")}
              >
                <View>
                  <Ionicons
                    name="person-circle-outline"
                    size={30}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          options={{ headerShadowVisible: false, headerTitle: "" }}
          name="Send"
          component={SendCash}
        />
        <Stack.Screen
          options={{ headerShadowVisible: false, headerTitle: "History" }}
          name="TransactionHistory"
          component={TransactionHistory}
        />
        <Stack.Screen
          options={{ headerShadowVisible: false, headerTitle: "" }}
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          options={{ headerShadowVisible: false, headerTitle: "" }}
          name="CoinListScreen"
          component={CoinListScreen}
        />
        <Stack.Screen
          options={{ headerShadowVisible: false, headerTitle: "" }}
          name="TransactionReceived"
          component={TransactionListReceived}
        />
        <Stack.Screen
          options={{ headerShadowVisible: false, headerTitle: "" }}
          name="TransactionSend"
          component={TransactionListSend}
        />
        <Stack.Screen name="Try" component={Try} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
