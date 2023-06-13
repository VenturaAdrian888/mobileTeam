import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginRegister';
import Dashboard from './screens/Dashboard';
import Profile from './screens/Profile';
import SendCash from './screens/SendCash';
import ReceiveCash from './screens/ReceiveCash';
import CoinListScreen from './screens/CoinList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShadowVisible: false }} name="Main" component={Dashboard} />
        <Stack.Screen name="Send" component={SendCash} />
        <Stack.Screen name="Receive" component={ReceiveCash} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="CoinListScreen" component={CoinListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
