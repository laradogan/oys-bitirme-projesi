import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { useState, useEffect } from 'react';
import { firebase } from './config'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';

import ProfileScreen from './src/ProfileScreen';
import Login from "./src/Login";
import Registration from "./src/Registration";
import Header from "./components/header";
import Dashboard from "./src/Dashboard";
import UploadScreen from './src/UploadScreen';
import ListingDetails from "./src/ListingDetails";


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: () => <Header name="" />,
          headerStyle: {
            backgroundColor: '#f0f0f0',
            shadowColor: '#F0F0F0',
            elevation: 15
          }
        }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{
          headerTitle: () => <Header name="" />,
          headerStyle: {
            backgroundColor: '#f0f0f0',
            shadowColor: '#F0F0F0',
            elevation: 15
          }
        }}
      />
    </Stack.Navigator>
  )
}

function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: () => <Header name="" />,
          headerStyle: {
            height: 50,
            weight: 0,
            backgroundColor: '#f0f0f0',
            shadowColor: '#F0F0F0',
            elevation: 25
          }
        }}
      />
      <Stack.Screen
        name="UploadScreen"
        component={UploadScreen}
        options={{
          headerTitle: () => <Header name="" />,
          headerStyle: {
            backgroundColor: '#f0f0f0',
            shadowColor: '#F0F0F0',
            elevation: 15
          }
        }}
      />
    </Stack.Navigator>
  )
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  if (loggedIn) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          barStyle={{ backgroundColor: '#ffffff', height: 63, elevation: 0, activeBackgroundColor: '#f0f0f0f0' }}
          shifting={true}
          activeColor="#b13c31"
          inactiveColor="#d44a3f">
          <Tab.Screen
            name="Ana Sayfa"
            component={Dashboard}
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <FontAwesomeIcon
                  icon={faHome}
                  size={focused ? 30 : 25}
                  color={color}
                  barStyle={{ backgroundColor: '#ffffff', height: 63, elevation: 0 }}
                />
              )
            }}
          />
          <Tab.Screen
            name="İlan Yükle"
            component={UploadScreen}
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <FontAwesomeIcon
                  icon={faPlus}
                  size={focused ? 30 : 25}
                  color={color}
                  barStyle={{ backgroundColor: '#ffffff', height: 63, elevation: 0 }}
                />
              )
            }}
          />
          <Tab.Screen
            name="Profil"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <FontAwesomeIcon
                  icon={faUser}
                  size={focused ? 30 : 25}
                  color={color}
                  barStyle={{ elevation: 0 }}
                />

              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    )
  }
}

export default App;