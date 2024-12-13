import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import firebase from '../services/firebase';

export default function ExcluirProduto({ route, navigation }) {
  const { produtoId } = route.params;

  function deletarProduto() {
    const db = firebase.firestore();

    db.collection('produtos')
      .doc(produtoId)
      .delete()
      .then(() => {
        alert('Sucesso: Produto excluído com sucesso!');
        navigation.goBack();
      })
      .catch((error) => alert('Erro: Não foi possível excluir o produto.', error.message));
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tem certeza que deseja excluir este produto?</Text>
      <Button title="Sim, excluir" onPress={deletarProduto} />
      <Button title="Cancelar" onPress={() => navigation.goBack()} />
    </View>
  );
}
