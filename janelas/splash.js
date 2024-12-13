import React, { useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import styles, { cores } from '../css/estilo';

export default function Splash({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../imagem/logo.png')}
      style={[styles.splashContainer, { justifyContent: 'center' }]} // Defina o tamanho desejado
      resizeMode="cover" 
    >
    </ImageBackground>
  );
}
