import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function addMesa({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState([
    { id: 1, name: 'Produto 1', category: 'bebidas', price: 25.99, quantity: 0 },
    { id: 2, name: 'Produto 2', category: 'carnes', price: 25.99, quantity: 0 },
    { id: 3, name: 'Produto 2', category: 'carnes', price: 25.99, quantity: 0 },
    { id: 4, name: 'Produto 2', category: 'bebidas', price: 25.99, quantity: 0 },
    { id: 5, name: 'Produto 2', category: 'sobremesas', price: 25.99, quantity: 0 },
    { id: 6, name: 'Produto 2', category: 'carnes', price: 25.99, quantity: 0 },
    { id: 7, name: 'Produto 2', category: 'carnes', price: 25.99, quantity: 0 },
    { id: 8, name: 'Produto 2', category: 'carnes', price: 25.99, quantity: 0 },
    { id: 9, name: 'Produto 2', category: 'sobremesas', price: 25.99, quantity: 0 },
    { id: 10, name: 'Produto 2', category: 'sobremesas', price: 25.99, quantity: 0 },
    { id: 11, name: 'Produto 2', category: 'massas', price: 25.99, quantity: 0 },
    { id: 12, name: 'Produto 2', category: 'carnes', price: 25.99, quantity: 0 },
    { id: 13, name: 'Produto 2', category: 'carnes', price: 25.99, quantity: 0 },
    { id: 14, name: 'Produto 2', category: 'massas', price: 25.99, quantity: 0 },
    { id: 15, name: 'Produto 2', category: 'carnes', price: 25.99, quantity: 0 },
    // Adicione mais produtos conforme necessário
  ]);

  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.name.toLowerCase().includes(text.toLowerCase())));
    }
  };

  const handleFilter = (category) => {
    setFilteredItems(items.filter(item => item.category === category));
    setModalVisible(false);
  };

  const incrementQuantity = (id) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setItems(updatedItems);
    setFilteredItems(updatedItems.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())));
  };

  const decrementQuantity = (id) => {
    const updatedItems = items.map(item => {
      if (item.id === id && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setItems(updatedItems);
    setFilteredItems(updatedItems.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Pesquisar"
        value={searchText}
        onChangeText={handleSearch}
      />
      <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="filter" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Filtrar por categoria</Text>
          <Button title="Bebidas" onPress={() => handleFilter('bebidas')} />
          <Button title="Sobremesas" onPress={() => handleFilter('sobre-mesas')} />
          <Button title="Carnes" onPress={() => handleFilter('carnes')} />
          <Button title="Massas" onPress={() => handleFilter('massas')} />
          <Button title="Fechar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      <ScrollView style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>N</Text>
          <Text style={styles.tableHeaderText}>Item</Text>
          <Text style={styles.tableHeaderText}>Add</Text>
          <Text style={styles.tableHeaderText}>R$</Text>
        </View>
        {filteredItems.map((item, index) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{index + 1}</Text>
            <Text style={styles.tableCell}>{item.name}</Text>
            <View style={styles.addControl}>
              <TouchableOpacity onPress={() => decrementQuantity(item.id)}>
                <Text style={styles.controlButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => incrementQuantity(item.id)}>
                <Text style={styles.controlButton}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.tableCell}>{item.price.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 20,
    alignItems: 'center',
  },
  searchBox: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
    fontSize: 18,
  },
  filterButton: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  table: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    padding: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
  },
  addControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  controlButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: '#000',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {
    backgroundColor: '#BBB',
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  addButton: {
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  backButtonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
  },
  addButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 20,
    color: '#FFF',
  },
});
