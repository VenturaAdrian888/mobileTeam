import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import Profile from './screens/Profile';
import SendCash from './screens/SendCash';
import ReceiveCash from './screens/ReceiveCash';
import CoinListScreen from './screens/CoinList';
import Try from './screens/Try';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
        <Stack.Screen options={{ headerShadowVisible: false }} name="Main" component={Dashboard} />
        <Stack.Screen name="Send" component={SendCash} />
        <Stack.Screen name="Receive" component={ReceiveCash} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="CoinListScreen" component={CoinListScreen} />
        <Stack.Screen name="Try" component={Try} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
