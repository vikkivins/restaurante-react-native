import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../css/estilo';
import gourmetData from '../json/data.json';
import firebase from '../services/firebase';

export default function Comida({ navigation }) {
  const [comidas, setComidas] = useState([]);

  // Defina a função fora do useEffect para que seja acessível em outros lugares
  const fetchComidas = async () => {
    try {
      const localData = gourmetData.comidas || [];

      const db = firebase.firestore();
      const snapshot = await db.collection('produtos')
        .where('categoria', '==', 'Comida')
        .get();

      const firebaseData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComidas([...localData, ...firebaseData]);
    } catch (error) {
      alert('Erro: Erro ao buscar dados: ' + error.message);
    }
  };

  useEffect(() => {
    // Chama a função para buscar os dados ao carregar o componente
    fetchComidas();
  }, []);

  useEffect(() => {
    // Atualiza os dados quando a tela de edição é fechada e voltamos para essa tela
    const unsubscribe = navigation.addListener('focus', () => {
      fetchComidas(); // Recarrega os dados
    });

    return unsubscribe; // Limpa o listener quando o componente for desmontado
  }, [navigation]);

  const handleDelete = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection('produtos').doc(id).delete();
      alert('Sucesso: Produto deletado com sucesso!');
      setComidas(prevComidas => prevComidas.filter(item => item.id !== id));
    } catch (error) {
      alert('Erro: Houve um erro ao deletar o produto.');
    }
  };

  const handleEdit = (produto) => {
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
          <TouchableOpacity onPress={() => handleEdit(item)} style={styles.button}>
            <MaterialCommunityIcons name="pencil" size={20} color="#fff" />
          </TouchableOpacity>

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
        data={comidas}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id || index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}