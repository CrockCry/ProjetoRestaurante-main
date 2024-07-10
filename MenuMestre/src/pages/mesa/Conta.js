// src/pages/mesa/Conta.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Conta = ({ route, navigation }) => {
  const { mesaId } = route.params;  // Obtém o ID da mesa passado pela tela anterior
  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Função para buscar os produtos da mesa
    const fetchProdutos = async () => {
      try {
        const response = await axios.get(`http://seu-endereco-api/mesa/${mesaId}/produtos`);
        setProdutos(response.data.produtos);

        // Calcula o total da mesa
        const totalMesa = response.data.produtos.reduce((acc, produto) => acc + produto.total_item, 0);
        setTotal(totalMesa);
      } catch (error) {
        console.error('Erro ao buscar produtos da mesa', error);
      }
    };

    fetchProdutos();
  }, [mesaId]);

  // Função para fechar a conta
  const fecharConta = async () => {
    try {
      await axios.post(`http://seu-endereco-api/mesa/${mesaId}/fechar`, { pagar_taxa: true });  // Envia a requisição para fechar a mesa
      navigation.goBack();  // Volta para a tela anterior após fechar a conta
    } catch (error) {
      console.error('Erro ao fechar a conta', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Conta</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text>{item.produto.nomeProduto} - {item.quantidade} x R$ {item.preco_unitario}</Text>
            <Text>Total: R$ {item.total_item.toFixed(2)}</Text>
          </View>
        )}
      />
      <Text style={styles.totalText}>Total da Mesa: R$ {total.toFixed(2)}</Text>
      <Text style={styles.serviceText}>Serviço de mesa: 10% - R$ {(total * 0.1).toFixed(2)}</Text>
      <Text style={styles.totalText}>Total com Serviço: R$ {(total * 1.1).toFixed(2)}</Text>
      <TouchableOpacity style={styles.closeBillButton} onPress={fecharConta}>
        <Text style={styles.closeBillButtonText}>Fechar Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  serviceText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeBillButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  closeBillButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Conta;
