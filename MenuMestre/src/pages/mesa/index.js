import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView, Modal, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Perfil({ navigation }) {
  const [mesas, setMesas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [capacity, setCapacity] = useState(null);

  useEffect(() => {
    fetchMesas();
  }, []);

  const fetchMesas = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error("Token de autenticação não encontrado.");
      }

      const response = await fetch("http://127.0.0.1:8000/api/mesa", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar mesas: ${response.statusText}`);
      }

      const data = await response.json();
      setMesas(data);
    } catch (error) {
      console.error("Erro ao buscar mesas:", error);
    }
  };

  const mesaAberta = (mesaId) => {
    navigation.navigate('mesaAberta', { mesaId });
  };

  const renderCapacityButtons = () => {
    return [...Array(10).keys()].map(i => (
      <TouchableOpacity
        key={i + 1}
        style={[styles.capacityButton, capacity === (i + 1) && styles.selectedCapacityButton]}
        onPress={() => setCapacity(i + 1)}
      >
        <Text style={[styles.capacityButtonText, capacity === (i + 1) && styles.selectedCapacityButtonText]}>
          {i + 1}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <View style={{ backgroundColor: 'grey', width: '100%', height: 60, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
        <Image source={require('../../../assets/perfil.png')} style={{ width: 50, height: 50 }} />
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Usuario</Text>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Função</Text>
      </View>

      <ImageBackground source={require('../../../assets/background.png')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <ScrollView>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <Text style={styles.text}>Seja bem vindo Usuario</Text>
            <Text style={styles.Title}>Mesas</Text>

            <View style={styles.cardContainer}>
              <View style={styles.addCard}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalTitle}>Adicionar mesa</Text>
                      <Text style={styles.modalSubtitle}>Capacidade da Mesa</Text>
                      <View style={styles.capacityContainer}>
                        {renderCapacityButtons()}
                      </View>
                      <View style={styles.buttonContainer}>
                        <Pressable
                          style={[styles.button, styles.buttonCancel]}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text style={styles.buttonText}>Cancelar</Text>
                        </Pressable>
                        <Pressable
                          style={[styles.button, styles.buttonAdd]}
                          onPress={async () => {
                            try {
                              const token = await AsyncStorage.getItem('userToken');
                              await fetch("http://127.0.0.1:8000/api/mesas", {
                                method: 'POST',
                                headers: {
                                  'Authorization': `Bearer ${token}`,
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  capacidade: capacity,
                                }),
                              });

                              fetchMesas(); // Atualiza a lista de mesas
                              setModalVisible(!modalVisible);
                            } catch (error) {
                              console.error("Erro ao adicionar mesa:", error);
                            }
                          }}
                        >
                          <Text style={styles.buttonText}>Adicionar</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Modal>
                <Pressable style={styles.addContent} onPress={() => setModalVisible(true)}>
                  <Image source={require('../../../assets/add.png')} style={styles.addIcon} />
                  <Text style={styles.addText}>Adicionar mesa</Text>
                </Pressable>
              </View>

              {mesas.map(mesa => (
                <View key={mesa.id} style={styles.tableCard}>
                  <View style={styles.tableContent}>
                    <Text style={styles.tableNumber}>Mesa {mesa.numero}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.tableCapacity}>Max: {mesa.capacidade}</Text>
                      <Image source={require('../../../assets/user.png')} style={styles.people} />
                    </View>
                    <Text style={styles.foodPrice}>{mesa.produtos ? `${mesa.produtos.length}/${mesa.capacidade}` : `0/${mesa.capacidade}`}</Text>
                  </View>
                  <TouchableOpacity style={styles.editButton} onPress={() => mesaAberta(mesa.id)}>
                    <Text style={styles.editButtonText}>Editar</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  capacityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  capacityButton: {
    borderRadius: 5,
    padding: 10,
    margin: 5,
    backgroundColor: '#EEE',
  },
  selectedCapacityButton: {
    backgroundColor: '#2196F3',
  },
  selectedCapacityButtonText: {
    color: 'white',
  },
  capacityButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: '48%',
  },
  buttonCancel: {
    backgroundColor: '#f44336',
  },
  buttonAdd: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
  },
  Title: {
    fontSize: 15,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 25,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
  },
  addCard: {
    width: '48%',
    height: 120,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    marginBottom: 10,
  },
  addContent: {
    alignItems: 'center',
  },
  addIcon: {
    width: 50,
    height: 50,
  },
  addText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
  tableCard: {
    width: '48%',
    height: 120,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    marginBottom: 10,
    overflow: 'hidden',
  },
  tableContent: {
    padding: 10,
  },
  tableNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableCapacity: {
    fontSize: 15,
    color: '#666',
    marginVertical: 5,
  },
  people: {
    width: 10,
    height: 10,
    alignSelf: 'center',
    marginLeft: 5,
    opacity: 0.5,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'right',
  },
  editButton: {
    backgroundColor: '#EEE',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    fontSize: 14,
    color: '#000',
  },
});
