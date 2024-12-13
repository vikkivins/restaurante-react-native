import React, { useState } from 'react';
import { Text, SafeAreaView, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import estilo from '../css/estilo';
import app from '../services/firebase';

export default function TelaLogin({ navigation, onLoginSuccess }) {
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function cadastraremail(email, senha) {
    app.auth()
      .createUserWithEmailAndPassword(email, senha)
      .then(userCredential => {
        alert('Usuário criado', `Usuário criado: ${userCredential.user.email}`);
        setSenha("")
        setEmail("")

    
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('Erro: Esse e-mail já está em uso.');
            break;
          case 'auth/invalid-email':
            alert('Erro: O e-mail inserido é inválido.');
            break;
          case 'auth/weak-password':
            alert('Erro: A senha é muito fraca. Use pelo menos 6 caracteres.');
            break;
          default:
            alert('Erro', error.message);
            break;
        }
      });
  }

const logar = () => {
  app.auth()
    .signInWithEmailAndPassword(email, senha)
    .then(() => {
      alert("Acesso liberado");
      onLoginSuccess(); // Atualiza o estado de autenticação
    })
    .catch(error => {
      switch (error.code) {
        case 'auth/user-not-found':
          alert('Erro: Usuário não cadastrado.');
          break;
        case 'auth/wrong-password':
          alert('Erro: Senha incorreta.');
          break;
        case 'auth/invalid-email':
          alert('Erro: O e-mail inserido é inválido.');
          break;
        default:
          alert('Erro', error.message);
          break;
      }
    });
};




  return (
    <ImageBackground
      source={require('../imagem/breads.png')}
      style={estilo.container}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          style={estilo.input}
          placeholder="Digite o email"
          onChangeText={setEmail}
          value={email}
          keyboardType='email-address'
        />
        <TextInput
          style={estilo.input}
          placeholder="Digite a senha"
          onChangeText={setSenha}
          value={senha}
          secureTextEntry
        />
        <TouchableOpacity
          style={estilo.btnenviar}
          onPress={logar}
        >
          <Text style={estilo.btntxtenviar}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={estilo.btnenviar}
          onPress={() => cadastraremail(email, senha)}
        >
          <Text style={estilo.btntxtenviar}>Cadastro</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}