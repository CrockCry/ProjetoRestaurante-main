import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Conta = ({ route, navigation }) => {
  const { mesaId } = route.params;  // Obtém o ID da mesa passado pela tela anterior
  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Função para buscar os produtos da mesa
    const fetchProdutos = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/mesa/${mesaId}/produtos`);
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
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("Token de autenticação não encontrado.");
      }
  
      const body = {
        status: "disponivel",
        pessoas_sentadas: 0, // Zera o número de pessoas sentadas
      };
  
      console.log("Dados enviados na requisição:", body);
  
      const response = await fetch(
        `http://127.0.0.1:8000/api/mesa/${mesaId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
  
      const responseData = await response.json();
  
      if (!response.ok) {
        console.error("Erro na resposta:", responseData);
        console.log("Dados enviados:", body);
        throw new Error(
          `Erro ao atualizar status da mesa: ${JSON.stringify(
            responseData.error
          )}`
        );
      }
  
      // Atualiza o estado local da mesa
      setProdutos([]);  // Limpa a lista de produtos
      setTotal(0);      // Zera o total
  
      navigation.navigate('Mesa');  // Volta para a tela anterior após fechar a conta
      console.log("Mesa atualizada com sucesso para fechamento.");
    } catch (error) {
      console.error("Erro ao fechar a conta:", error);
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
