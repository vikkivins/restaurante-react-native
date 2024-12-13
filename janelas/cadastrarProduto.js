import { useState } from 'react';
import { Text, SafeAreaView, TextInput, TouchableOpacity, Alert, Picker } from 'react-native';
import estilo from '../css/estilo';
import firebase from '../services/firebase'; // Importando o Firebase

export default function CadastrarProduto() {
  const [produto, setProduto] = useState(null);
  const [preco, setPreco] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [categoria, setCategoria] = useState("Comida"); // Valor inicial definido como 'Comida'

  function inserirProduto() {
    const db = firebase.firestore(); // Acessando o Firestore

    db.collection('produtos').add({
      produto: produto,
      preco: preco,
      descricao: descricao,
      categoria: categoria, // Adicionando a categoria ao cadastro
    })
    .then(() => {
      setProduto("");
      setPreco("");
      setDescricao("");
      setCategoria("Comida"); // Resetando a categoria após o cadastro
      alert("Cadastro: Produto cadastrado com sucesso!");
    })
    .catch((error) => {
      alert("Erro: Erro ao cadastrar o produto: " + error.message);
    });
  }

  return (
    <SafeAreaView style={estilo.container}>
      <Text style={estilo.paragraph}>Cadastro de Produto</Text>

      <TextInput
        style={estilo.input}
        placeholder="Digite o nome do produto"
        onChangeText={setProduto}
        value={produto}
      />

      <TextInput
        style={estilo.input}
        placeholder="Digite o preço"
        keyboardType="numeric"
        onChangeText={setPreco}
        value={preco}
      />

      <TextInput
        style={estilo.input}
        placeholder="Digite a descrição"
        onChangeText={setDescricao}
        value={descricao}
      />

      <Text style={estilo.paragraph}>Escolha a categoria:</Text>

      <Picker
        selectedValue={categoria}
        style={estilo.input}
        onValueChange={(itemValue) => setCategoria(itemValue)} // Atualizando a categoria
      >
        <Picker.Item label="Comida" value="Comida" />
        <Picker.Item label="Bebidas" value="Bebidas" />
        <Picker.Item label="Drinks" value="Drinks" />
        <Picker.Item label="Porções" value="Porcoes" />
        <Picker.Item label="Promoção" value="Promocao" />
      </Picker>

      <TouchableOpacity
        style={estilo.btnenviar}
        onPress={inserirProduto}>
        <Text style={estilo.btntxtenviar}>Cadastrar Produto</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}