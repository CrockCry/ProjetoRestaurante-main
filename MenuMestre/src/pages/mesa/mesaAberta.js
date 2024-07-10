import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importação do AsyncStorage

export default function MesaAberta({ route, navigation }) {
  const { mesaId } = route.params || {};
  console.log("mesaId recebido:", mesaId); // Verificar se mesaId está disponível
  const [produtos, setProdutos] = useState([]);
  const [mesa, setMesa] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mesaId) {
      fetchMesaProdutos();
      // Atualiza a cada 5 segundos
      const intervalId = setInterval(fetchMesaProdutos, 5000);
      return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar
    } else {
      console.error("mesaId não está disponível");
      setLoading(false);
    }
  }, [mesaId]);

  const fetchMesaProdutos = async () => {
    try {
        if (!mesaId) {
            throw new Error("ID da mesa não está disponível.");
        }

        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            throw new Error("Token de autenticação não encontrado.");
        }

        const response = await fetch(`http://127.0.0.1:8000/api/mesa/${mesaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na resposta: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Dados recebidos:", data);

        // Verifique se a estrutura dos dados está correta
        if (!data.mesa || !Array.isArray(data.produtos)) {
            throw new Error("Estrutura de dados inesperada.");
        }

        setMesa(data.mesa);
        setProdutos(data.produtos);

        // Atualizar o total da mesa com base nos produtos
        const total = data.produtos.reduce((acc, produto) => acc + produto.total_item, 0);
        setMesa(prevMesa => ({
            ...prevMesa,
            total
        }));
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    } finally {
        setLoading(false);
    }
};



  const addMesa = () => {
    navigation.navigate("AddMesa", { mesaId: mesa.id });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "grey",
          width: "100%",
          height: 60,
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Image
          source={require("../../../assets/perfil.png")}
          style={{ width: 50, height: 50 }}
        />
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Usuario</Text>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Função</Text>
      </View>

      <ImageBackground
        source={require("../../../assets/background.png")}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
         <Text style={styles.header}>Produtos a mesa</Text>
            <View style={styles.card}>
                <Text style={styles.title}>
                    Mesa {mesa.numero_mesa} - {mesa.status}
                </Text>
                <Text style={styles.subtitle}>
                    {mesa.pessoas_sentadas}/{mesa.capacidade}{' '}
                    <Image
                        source={require('../../../assets/user.png')}
                        style={{ width: 16, height: 16 }}
                    />
                </Text>
                <TouchableOpacity style={styles.addButton} onPress={addMesa}>
                    <Text style={styles.addButtonText}>Adicionar produtos a mesa</Text>
                </TouchableOpacity>
                <Text style={styles.sectionTitle}>Produtos</Text>
                <View style={styles.productsBox}>
                    {produtos.length === 0 ? (
                        <Text>Mesa vazia</Text>
                    ) : (
                        produtos.map((produto, index) => (
                            <View key={index} style={styles.productItem}>
                                <Text>{produto.produto.nomeProduto} - {produto.quantidade} unidade(s) - R$ {produto.preco_unitario.toFixed(2)}</Text>
                            </View>
                        ))
                    )}
                </View>
                <Text style={styles.totalText}>Total da mesa: R$ {mesa.total?.toFixed(2) || '0.00'}</Text>
                <Text style={styles.serviceText}>Serviço de mesa: 10%</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.billButton} onPress={() => navigation.navigate('Conta', { mesaId: mesa.id })}>
                        <Text style={styles.billButtonText}>Conta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sendButton}>
                        <Text style={styles.sendButtonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: "#FFF",
    textAlign: "center",
    marginTop: 20,
  },
  Title: {
    fontSize: 15,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 25,
  },

  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    color: "#FFF",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productsBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  totalText: {
    fontSize: 14,
    marginBottom: 5,
  },
  serviceText: {
    fontSize: 14,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  billButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    width: "30%",
  },
  backButton: {
    backgroundColor: "#bbb",
    padding: 10,
    borderRadius: 5,
    width: "30%",
  },
  sendButton: {
    backgroundColor: "#FFC107",
    padding: 10,
    borderRadius: 5,
    width: "30%",
  },
  billButtonText: {
    color: "white",
    textAlign: "center",
  },
  backButtonText: {
    color: "black",
    textAlign: "center",
  },
  sendButtonText: {
    color: "white",
    textAlign: "center",
  },
});
