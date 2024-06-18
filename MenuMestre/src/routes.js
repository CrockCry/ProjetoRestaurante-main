import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './pages/home';
import Login from './pages/login';
import Senha from './pages/senha';
import Perfil from './pages/perfil';
import Notifica from './pages/notifica';
import Configuracao from './pages/configuracao';


import {Entypo, Feather} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Login" component={Login} options={{
          tabBarIcon: ({color, size}) => <Entypo
            name="windows-store"
            size={size}
            color={color}
          />
        }}/>
        <Tab.Screen name="Senha" component={Senha} options={{
          tabBarIcon: ({color, size}) => <Entypo
            name="emoji-sad"
            size={size}
            color={color}
          />
        }}/>
        <Tab.Screen name="Home" component={Home} options={{
          tabBarIcon: ({color, size}) => <Entypo
            name="home"
            size={size}
            color={color}
          />
        }}/>
        <Tab.Screen name="Perfil" component={Perfil} options={{
          tabBarIcon: ({color, size}) => <Entypo
            name="user"
            size={size}
            color={color}
          />
        }}/>
        <Tab.Screen name="Notifica" component={Notifica} options={{
          tabBarIcon: ({color, size}) => <Entypo
            name="notification"
            size={size}
            color={color}
          />
        }}/>
        <Tab.Screen name="Configuracao" component={Configuracao} options={{
          tabBarIcon: ({color, size}) => <Entypo
            name="cog"
            size={size}
            color={color}
          />
        }}/>
      </Tab.Navigator>
    );
  }

