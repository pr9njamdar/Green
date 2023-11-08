import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuPage from './components/MenuPage';
import ComplaintForm from './components/ComplaintForm';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MenuPage} />
        <Stack.Screen name="ComplaintForm" component={ComplaintForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
