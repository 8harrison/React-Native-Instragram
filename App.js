import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import Context from './context/valueContext';
import FeedScreen from './screens/FeedScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Context>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: 'blue' },
            headerTitleStyle: { fontWeight: 600, fontSize: 22, color: 'white' },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen name='Feed' component={FeedScreen}/>
          <Stack.Screen name="Publicar" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context>
  );
}
