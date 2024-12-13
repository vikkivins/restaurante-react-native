//menu.js

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import ComidaScreen from './comida';
import BebidasScreen from './bebidas';
import DrinksScreen from './drinks';
import PorcoesScreen from './porcoes';
import PromocaoScreen from './promocao';

const Tab = createBottomTabNavigator();

export default function MenuScreen() {
  return (
      <Tab.Navigator 
        initialRouteName="Comida"
        screenOptions={{
          tabBarActiveTintColor: '#ff9b21',
          headerShown: false,
        }}
      >
        <Tab.Screen 
          name="Comida" 
          component={ComidaScreen}
          options={{
            tabBarLabel: 'COMIDA',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="fast-food-outline" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen 
          name="Bebidas" 
          component={BebidasScreen}
          options={{
            tabBarLabel: 'BEBIDAS',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cup" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen 
          name="Drinks" 
          component={DrinksScreen}
          options={{
            tabBarLabel: 'DRINKS',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="glass-cocktail" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen 
          name="Porcoes" 
          component={PorcoesScreen}
          options={{
            tabBarLabel: 'PORÇÕES',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="food-fork-drink" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen 
          name="Promocao" 
          component={PromocaoScreen}
          options={{
            tabBarLabel: 'PROMOÇÕES',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="tags" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}