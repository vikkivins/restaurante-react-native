import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../css/estilo';
import gourmetData from '../json/data.json';
import firebase from '../services/firebase'; // Importando Firebase

export default function Promocao({ navigation }) {
  const [promocao, setPromocao] = useState([]);

  // Defina a função fora do useEffect para que seja acessível em outros lugares
  const fetchPromocoes = async () => {
    try {
      // Dados do JSON local
      const localData = gourmetData.promocao || [];

      // Dados do Firebase
      const db = firebase.firestore();
      const snapshot = await db.collection('produtos')
        .where('categoria', '==', 'Promocao') // Filtra os produtos com promoção
        .get();

      const firebaseData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Combinação dos dados do JSON e Firebase
      setPromocao([...localData, ...firebaseData]);
    } catch (error) {
      alert('Erro: Erro ao buscar promoções: ' + error.message);
    }
  };

  useEffect(() => {
    // Chama a função para buscar os dados ao carregar o componente
    fetchPromocoes();
  }, []);

  useEffect(() => {
    // Atualiza os dados quando a tela de edição é fechada e voltamos para essa tela
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPromocoes(); // Recarrega os dados
    });

    return unsubscribe; // Limpa o listener quando o componente for desmontado
  }, [navigation]);

  const handleDelete = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection('produtos').doc(id).delete();
      alert('Sucesso: Promoção deletada com sucesso!');
      setPromocao(prevPromocao => prevPromocao.filter(item => item.id !== id));
    } catch (error) {
      alert('Erro: Houve um erro ao deletar a promoção.');
    }
  };

  const handleEdit = (produto) => {
    // Navega para a tela de edição, passando os dados da promoção
    navigation.navigate('Editar Produto', { produto });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image
          source={require('../imagem/logo.png')}
          style={styles.cardImage}
        />
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{item.produto || item.nome}</Text>
          <Text style={styles.cardDescription}>
            {item.descricao || 'Descrição não disponível'}
          </Text>
          <Text style={styles.cardPrice}>R$ {item.preco || item.valor}</Text>
        </View>
        <View style={styles.actionButtons}>
          {/* Botão de edição */}
          <TouchableOpacity onPress={() => handleEdit(item)} style={styles.button}>
            <MaterialCommunityIcons name="pencil" size={20} color="#fff" />
          </TouchableOpacity>

          {/* Botão de exclusão */}
          <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.button}>
            <MaterialCommunityIcons name="trash-can" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={promocao}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id || index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}