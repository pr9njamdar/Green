import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuPage from './components/MenuPage';
import ComplaintForm from './components/ComplaintForm';
import OrganizeDrive from './components/OrganizeDrive';
import UpcomingDrives from './components/UpcomingDrives'
import AuthScreen from './components/AuthScreen';
const Stack = createStackNavigator();

function App() {
  const data = [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' },
    // Add more items as needed
  ];
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Menu" component={MenuPage} />
        <Stack.Screen name="ComplaintForm" component={ComplaintForm} />
        <Stack.Screen name="OrganizeDrive" component={OrganizeDrive} />        
        <Stack.Screen name="UpcomingDrives" initialParams={data} component={UpcomingDrives} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
