//app.js

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from './janelas/splash';
import LoginScreen from './janelas/login';
import MenuScreen from './janelas/menu';
import ComidaScreen from './janelas/comida';
import BebidasScreen from './janelas/bebidas';
import DrinksScreen from './janelas/drinks';
import PorcoesScreen from './janelas/porcoes';
import PromocaoScreen from './janelas/promocao';
import PesquisarProdutoScreen from './janelas/pesquisarProduto';
import CadastrarProdutoScreen from './janelas/cadastrarProduto';
import EditarProdutoScreen from './janelas/editarProduto';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Comida" component={ComidaScreen} />
      <Stack.Screen name="Bebidas" component={BebidasScreen} />
      <Stack.Screen name="Drinks" component={DrinksScreen} />
      <Stack.Screen name="Porcoes" component={PorcoesScreen} />
      <Stack.Screen name="Promocao" component={PromocaoScreen} />
    </Stack.Navigator>
  );
}


function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#ff9b21' },
        headerTintColor: '#fff',
        drawerStyle: { backgroundColor: '#f4f4f4', width: 240 },
      }}
    >
      <Drawer.Screen name="Home" component={MainStack} />
      <Drawer.Screen name="Pesquisar Produto" component={PesquisarProdutoScreen} />
      <Drawer.Screen name="Cadastrar Produto" component={CadastrarProdutoScreen} />
      <Drawer.Screen name="Editar Produto" component={EditarProdutoScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Controle de autenticação

  useEffect(() => {
    // Simulando tempo da SplashScreen
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppDrawer /> // Drawer Navigation para usuários autenticados
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen 
            name="Login" 
            component={(props) => (
              <LoginScreen {...props} onLoginSuccess={() => setIsAuthenticated(true)} />
            )} 
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}