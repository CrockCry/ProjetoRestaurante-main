import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TextInput,
  Picker,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddMesa({ route, navigation }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [quantities, setQuantities] = useState({});

  // Recebe o mesaId da rota
  const { mesaId } = route.params || {};

  useEffect(() => {
    fetchProdutos();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchText, selectedCategory, items]);

  const fetchProdutos = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error("Token de autenticação não encontrado.");
      }

      const response = await fetch("http://127.0.0.1:8000/api/cardapio", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setItems(data.map((item, index) => ({ ...item, id: item.id || index })));
      } else {
        setItems([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = items;

    if (searchText) {
      filtered = filtered.filter(item =>
        item.nomeProduto.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== 'todos') {
      filtered = filtered.filter(item => item.categoriaProduto === selectedCategory);
    }

    setFilteredItems(filtered);
  };

  const handleAddProduct = async (produto) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!mesaId) {
        alert('ID da mesa não encontrado.');
        return;
      }

      const quantity = quantities[produto.id] || 1;

      const response = await fetch(`http://127.0.0.1:8000/api/mesa/${mesaId}/produtos`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          produto_id: produto.id,
          quantidade: quantity,
        }),
      });

      if (response.ok) {
        alert('Produto adicionado com sucesso!');
        navigation.navigate('MesaAberta', { mesaId });  // Navega para MesaAberta passando a mesaId
      } else {
        alert('Erro ao adicionar produto');
      }
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  const handleQuantityChange = (produtoId, newQuantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [produtoId]: newQuantity,
    }));
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
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar produtos"
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />

      <Picker
        selectedValue={selectedCategory}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        <Picker.Item label="Todos" value="todos" />
        <Picker.Item label="Bebidas" value="bebida" />
        <Picker.Item label="Sobremesas" value="sobremesa" />
        <Picker.Item label="Massas" value="massa" />
      </Picker>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nomeProduto}</Text>
            <Text>Preço: R$ {item.valorProduto}</Text>
            <TextInput
              style={styles.quantityInput}
              keyboardType='numeric'
              value={quantities[item.id]?.toString() || '1'}
              onChangeText={(text) => handleQuantityChange(item.id, parseInt(text) || 1)}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddProduct(item)}
            >
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  quantityInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
