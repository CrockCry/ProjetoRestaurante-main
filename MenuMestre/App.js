import * as React from 'react';
    import React, {useState} from 'react';
import { Modal } from 'react-native-modal';
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


import Home from './src/pages/home';
import Mensagem from './src/pages/Message';
import Login from './src/pages/login';
import Senha from './src/pages/senha';
import Mesa from './src/pages/mesa'
import mesaAberta from './src/pages/mesa/mesaAberta';
import addMesa from './src/pages/mesa/addMesa';
import Funcionario from './src/pages/Funcionario/index'
import Menu from './src/pages/Menu'
import Add from './src/pages/Funcionario/add'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs(route) {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarActiveBackgroundColor: '#e45',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen
        name='Funcionario'
        component={Funcionario}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Mesa'
        component={Mesa}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="table-bar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Home'
        component={Home}
        initialParams={{idFuncionario: route.params,idFuncionario}}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Menu'
        component={Menu}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="menu" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Mensagens'
        component={Mensagem}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="message" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}



export default function App(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Senha" component={Senha} />
        <Stack.Screen name="Inicio" component={Home} />
        <Stack.Screen name="Home" component={MyTabs} initialParams={{idFuncionario: route.params,idFuncionario}} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="mesaAberta" component={mesaAberta} />
        <Stack.Screen name="addMesa" component={addMesa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

