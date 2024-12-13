import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Text, Alert, ScrollView, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import estilo from '../css/estilo';
import firebase from '../services/firebase';
import data from '../json/data.json';

export default function EditarProduto({ route, navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [selectedProduto, setSelectedProduto] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [origem, setOrigem] = useState('');

  const loadProdutos = useCallback(async () => {
    try {
      const db = firebase.firestore();
      const snapshot = await db.collection('produtos').get();
      const firebaseProdutos = snapshot.docs.map(doc => ({ 
        ...doc.data(), 
        id: doc.id,
        source: 'firebase' 
      }));

      const jsonProdutos = Object.values(data)
        .flat()
        .map((produto, index) => ({
          ...produto,
          id: `json_${index}`,
          source: 'json'
        }));

      const todosProdutos = [
        ...firebaseProdutos,
        ...jsonProdutos
      ];

      todosProdutos.sort((a, b) => 
        (a.nome || a.produto || '').localeCompare(b.nome || b.produto || '')
      );

      setProdutos(todosProdutos);

      if (route.params?.produto) {
        const produtoInicial = todosProdutos.find(p => p.id === route.params.produto.id);

        if (produtoInicial) {
          handleProdutoSelect(produtoInicial.id);
        } else {
          const novoProduto = route.params.produto;
          setSelectedProduto(novoProduto.id);
          setNome(novoProduto.nome || novoProduto.produto || '');
          setDescricao(novoProduto.descricao || '');
          setPreco(novoProduto.valor || novoProduto.preco || '');
          setOrigem(novoProduto.source || 'firebase');
        }
      }
    } catch (error) {
      console.error('Erro ao carregar os produtos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os produtos');
    }
  }, [route.params?.produto]);

  useEffect(() => {
    loadProdutos();
  }, [loadProdutos]);

  const handleProdutoSelect = (produtoId) => {
    const produtoSelecionado = produtos.find(p => p.id === produtoId);
    if (produtoSelecionado) {
      setSelectedProduto(produtoId);
      setNome(produtoSelecionado.nome || produtoSelecionado.produto || '');
      setDescricao(produtoSelecionado.descricao || '');
      setPreco(produtoSelecionado.valor || produtoSelecionado.preco || '');
      setOrigem(produtoSelecionado.source);
    }
  };

  const handleSave = async () => {
    try {
      if (!nome || !preco) {
        Alert.alert('Erro', 'Nome e preço são obrigatórios');
        return;
      }

      if (origem === 'firebase') {
        const db = firebase.firestore();
        const produtoSelecionado = produtos.find(p => p.id === selectedProduto);
        const produtoRef = db.collection('produtos').doc(produtoSelecionado.id);

        await produtoRef.update({
          produto: nome,
          descricao,
          preco: preco.replace(',', '.'),
        });

        setSelectedProduto(null);
        setNome('');
        setDescricao('');
        setPreco('');
        setOrigem('');

        Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Não é possível editar produtos do JSON diretamente');
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o produto');
    }
  };

  const formatProdutoLabel = (produto) => {
    const nomeProduto = produto.nome || produto.produto || 'Produto sem nome';
    const categoriaProduto = Object.keys(data).find(categoria => 
      data[categoria].some(p => p.nome === nomeProduto)
    );

    return categoriaProduto 
      ? `${nomeProduto} (${categoriaProduto})` 
      : nomeProduto;
  };

  return (
    <SafeAreaView style={estilo.container}>
      <ScrollView 
        contentContainerStyle={estilo.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={estilo.titulo}>Editar Produto</Text>
        <View style={estilo.pickerContainer}>
          <Picker
            selectedValue={selectedProduto}
            onValueChange={handleProdutoSelect}
            style={estilo.input}
          >
            <Picker.Item label="Selecione um produto" value={null} />
            {produtos.map((produto) => (
              <Picker.Item 
                key={produto.id} 
                label={formatProdutoLabel(produto)} 
                value={produto.id} 
              />
            ))}
          </Picker>
        </View>
        <TextInput
          style={estilo.input}
          placeholder="Nome do Produto"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={estilo.input}
          placeholder="Descrição (opcional)"
          value={descricao}
          onChangeText={setDescricao}
        />
        <TextInput
          style={estilo.input}
          placeholder="Preço"
          value={preco}
          onChangeText={setPreco}
          keyboardType="numeric"
        /> 
        <TouchableOpacity
          style={[estilo.btnenviar, (!selectedProduto || origem !== 'firebase') && estilo.btnDisabled]}
          onPress={handleSave}
          disabled={!selectedProduto || origem !== 'firebase'}
        >
          <Text style={estilo.btntxtenviar}>
            {origem === 'firebase' ? 'Salvar Alterações' : 'Não é possível editar'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}