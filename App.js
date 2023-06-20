import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import DashboardScreen from "./screens/Dashboard";
import ProfileScreen from "./screens/Profile";
import SendScreen from "./screens/Send";
import TransactionHistoryScreen from "./screens/TransactionHistory";
import CoinListsScreen from "./screens/CoinLists";
import TransactionReceivedScreen from "./screens/TransactionReceived";
import TransactionSentScreen from "./screens/TransactionSent";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShadowVisible: false,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShadowVisible: false,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            headerShadowVisible: false,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="Send"
          component={SendScreen}
          options={{
            headerShadowVisible: false,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShadowVisible: false,
            headerTitle: "Profile",
          }}
        />
        <Stack.Screen
          name="CoinLists"
          component={CoinListsScreen}
          options={{
            headerShadowVisible: false,
            headerTitle: "Coins",
          }}
        />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistoryScreen}
          options={{
            headerShadowVisible: false,
            headerTitle: "History",
          }}
        />
        <Stack.Screen
          name="TransactionReceived"
          component={TransactionReceivedScreen}
          options={{
            headerShadowVisible: false,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="TransactionSent"
          component={TransactionSentScreen}
          options={{
            headerShadowVisible: false,
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
