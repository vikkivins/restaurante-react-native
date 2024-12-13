import { useState } from 'react';
import { Text, SafeAreaView, TextInput, TouchableOpacity, FlatList, View, Image } from 'react-native';
import estilo from '../css/estilo';
import firebase from '../services/firebase';
import produtosJSON from '../json/data.json'; // Importe o JSON

export default function PesquisarProduto() {
  const [produtoPesquisado, setProdutoPesquisado] = useState('');
  const [produtos, setProdutos] = useState([]);

  function normalizarTexto(texto) {
    return texto
      .normalize('NFD') // Separa os acentos
      .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
      .toLowerCase(); // Converte para minúsculas
  }

  function pesquisarProduto() {
    if (!produtoPesquisado.trim()) {
      alert('Erro: Por favor, insira um termo para pesquisar.');
      return;
    }

    const termoNormalizado = normalizarTexto(produtoPesquisado);
    const db = firebase.firestore();

    // Inicia um array para armazenar os resultados
    const produtosEncontrados = [];

    // Pesquisa no Firebase
    db.collection('produtos')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const produtoNormalizado = normalizarTexto(data.produto);
          if (produtoNormalizado.includes(termoNormalizado)) {
            produtosEncontrados.push({ ...data, origem: 'firebase' });
          }
        });

        // Pesquisa no JSON (em todas as categorias: comidas, bebidas, etc.)
        Object.values(produtosJSON).forEach((categoria) => {
          categoria.forEach((produto) => {
            const produtoNormalizado = normalizarTexto(produto.nome);
            if (produtoNormalizado.includes(termoNormalizado)) {
              produtosEncontrados.push({ ...produto, origem: 'json' });
            }
          });
        });

        setProdutos(produtosEncontrados);
      })
      .catch((error) => {
        alert('Erro: Erro ao pesquisar o produto: ' + error.message);
      });
  }

  return (
    <SafeAreaView style={estilo.container}>
      <Text style={estilo.paragraph}>Pesquisar Produto</Text>

      <TextInput
        style={estilo.input}
        placeholder="Digite o nome do produto"
        onChangeText={setProdutoPesquisado}
        value={produtoPesquisado}
      />

      <TouchableOpacity style={estilo.btnenviar} onPress={pesquisarProduto}>
        <Text style={estilo.btntxtenviar}>Pesquisar</Text>
      </TouchableOpacity>

      {produtos.length > 0 ? (
        <FlatList
          data={produtos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={estilo.card}>
              <Image
                source={item.imagem ? { uri: item.imagem } : require('../imagem/logo.png')} // Verifica se tem imagem
                style={estilo.cardImage}
              />
              <View style={estilo.cardInfo}>
                <Text style={estilo.cardTitle}>
                  {item.origem === 'firebase' ? item.produto : item.nome}
                </Text>
                {/* Exibe a descrição apenas quando existir */}
                <Text style={estilo.cardDescription}>
                  {item.origem === 'firebase' ? item.descricao : item.descricao || 'Sem descrição'}
                </Text>
                {/* Exibe o preço com base na origem */}
                <Text style={estilo.cardPrice}>
                  Preço: R$ {item.origem === 'firebase' ? item.preco : item.valor}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={estilo.paragraph}>Nenhum produto encontrado</Text>
      )}
    </SafeAreaView>
  );
}