import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
  Pressable,
  StyleSheet,
  Picker,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil({ navigation }) {
  const [mesas, setMesas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [pessoasSentadas, setPessoasSentadas] = useState(0);

  useEffect(() => {
    fetchMesas();
  }, []);

  const fetchMesas = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("Token de autenticação não encontrado.");
      }

      const response = await fetch("http://127.0.0.1:8000/api/mesa", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  const handleEditarMesa = async (mesa) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("Token de autenticação não encontrado.");
      }

      const body = {
        status: "ocupada",
        pessoas_sentadas: mesa.pessoas_sentadas || 0, // Defina um valor padrão
      };

      console.log("Dados enviados na requisição:", body);

      const response = await fetch(
        `http://127.0.0.1:8000/api/mesa/${mesa.id}`,
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

      setSelectedMesa(mesa);
      setModalEditVisible(true);
      console.log("Mesa selecionada para edição:", mesa);
    } catch (error) {
      console.error("Erro ao atualizar status da mesa:", error);
    }
  };

  // numero de pessaos
  const [numPessoas, setNumPessoas] = useState(0);

  // Atualize o número de pessoas
  const handleNumPessoasChange = (value) => {
    setNumPessoas(value);
    console.log("Número de pessoas selecionado:", value); // Verifique se o valor está sendo atualizado
  };

  // confirmar pessoas
  const handleConfirmarPessoas = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error("Token de autenticação não encontrado.");
      }
  
      if (numPessoas < 1) {
        console.error("Número de pessoas deve ser um número maior ou igual a 1.");
        return;
      }
  
      const body = {
        status: 'ocupada',
        pessoas_sentadas: numPessoas,
      };
  
      console.log("Dados enviados na requisição:", body);
  
      const response = await fetch(`http://127.0.0.1:8000/api/mesa/${selectedMesa.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        console.error("Erro na resposta:", responseData);
        throw new Error(`Erro ao atualizar pessoas sentadas: ${JSON.stringify(responseData.error)}`);
      }
  
      // Atualize a mesa localmente após sucesso
      setSelectedMesa(prevMesa => ({ ...prevMesa, pessoas_sentadas: numPessoas }));
      setModalEditVisible(false);
      console.log("Número de pessoas atualizadas:", numPessoas);
  
      // Navegue para a página de mesaAberta com os dados da mesa
      navigation.navigate('mesaAberta', { mesaId: selectedMesa.id });

      
  
    } catch (error) {
      console.error("Erro ao atualizar pessoas sentadas:", error);
    }
  };
  
  const handleCancelar = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error("Token de autenticação não encontrado.");
      }
  
      // Atualiza o status da mesa para 'disponível'
      const body = {
        status: 'disponivel',
        pessoas_sentadas: 0,  // Zera o número de pessoas sentadas
      };
  
      console.log("Dados enviados na requisição para cancelar:", body);
  
      const response = await fetch(`http://127.0.0.1:8000/api/mesa/${selectedMesa.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        console.error("Erro na resposta:", responseData);
        throw new Error(`Erro ao atualizar o status da mesa: ${JSON.stringify(responseData.error)}`);
      }
  
      // Atualize a mesa localmente após sucesso
      setSelectedMesa(prevMesa => ({ ...prevMesa, status: 'disponível', pessoas_sentadas: 0 }));
      setModalEditVisible(false);
      console.log("Mesa cancelada e status atualizado para disponível");
  
    } catch (error) {
      console.error("Erro ao cancelar mesa:", error);
    }
  };
  
  const renderCapacityButtons = () => {
    return [...Array(selectedMesa?.capacidade || 0).keys()].map((i) => (
      <TouchableOpacity
        key={i + 1}
        style={[
          styles.capacityButton,
          pessoasSentadas === i + 1 && styles.selectedCapacityButton,
        ]}
        onPress={() => setPessoasSentadas(i + 1)}
      >
        <Text
          style={[
            styles.capacityButtonText,
            pessoasSentadas === i + 1 && styles.selectedCapacityButtonText,
          ]}
        >
          {i + 1}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
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
        <ScrollView>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text style={styles.text}>Seja bem vindo Usuario</Text>
            <Text style={styles.Title}>Mesas</Text>

            <View style={styles.cardContainer}>
              <View style={styles.addCard}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalTitle}>Adicionar mesa</Text>
                      <Text style={styles.modalSubtitle}>
                        Capacidade da Mesa
                      </Text>
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
                              const token = await AsyncStorage.getItem(
                                "userToken"
                              );
                              await fetch("http://127.0.0.1:8000/api/mesa", {
                                method: "POST",
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  capacidade: capacidade,
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
                <Pressable
                  style={styles.addContent}
                  onPress={() => setModalVisible(true)}
                >
                  <Image
                    source={require("../../../assets/add.png")}
                    style={styles.addIcon}
                  />
                  <Text style={styles.addText}>Adicionar mesa</Text>
                </Pressable>
              </View>

              {mesas.map((mesa) => (
                <View key={mesa.id} style={styles.tableCard}>
                  <View style={styles.tableContent}>
                    <Text style={styles.tableNumber}>Mesa {mesa.numero}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.tableCapacity}>
                        Max: {mesa.capacidade}
                      </Text>
                      <Image
                        source={require("../../../assets/user.png")}
                        style={styles.people}
                      />
                    </View>
                    <Text style={styles.foodPrice}>
                      {mesa.pessoas_sentadas}/{mesa.capacidade}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditarMesa(mesa)}
                  >
                    <Text style={styles.editButtonText}>Editar</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditVisible}
        onRequestClose={() => {
          setModalEditVisible(!modalEditVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Selecionar Pessoas Sentadas</Text>
            <Text style={styles.modalSubtitle}>
              Capacidade: {selectedMesa?.capacidade}
            </Text>
            <View style={styles.capacityContainer}>
              <Picker
                selectedValue={numPessoas}
                onValueChange={(value) => handleNumPessoasChange(value)}
                style={styles.picker} // Adicione estilos se necessário
              >
                <Picker.Item label="Selecione o número de pessoas" value={0} />
                {[...Array(selectedMesa?.capacidade).keys()].map((num) => (
                  <Picker.Item
                    key={num + 1}
                    label={`${num + 1}`}
                    value={num + 1}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={handleCancelar}
              > 
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonAdd]}
                onPress={handleConfirmarPessoas}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
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
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  capacityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  capacityButton: {
    borderRadius: 5,
    padding: 10,
    margin: 5,
    backgroundColor: "#EEE",
  },
  selectedCapacityButton: {
    backgroundColor: "#2196F3",
  },
  selectedCapacityButtonText: {
    color: "white",
  },
  capacityButtonText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: "48%",
  },
  buttonCancel: {
    backgroundColor: "#f44336",
  },
  buttonAdd: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
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
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "90%",
  },
  addCard: {
    width: "48%",
    height: 120,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    marginBottom: 10,
  },
  addContent: {
    alignItems: "center",
  },
  addIcon: {
    width: 50,
    height: 50,
  },
  addText: {
    marginTop: 10,
    fontSize: 16,
    color: "#000",
  },
  tableCard: {
    width: "48%",
    height: 120,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    marginBottom: 10,
    overflow: "hidden",
  },
  tableContent: {
    padding: 10,
  },
  tableNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tableCapacity: {
    fontSize: 15,
    color: "#666",
    marginVertical: 5,
  },
  people: {
    width: 10,
    height: 10,
    alignSelf: "center",
    marginLeft: 5,
    opacity: 0.5,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "right",
  },
  editButton: {
    backgroundColor: "#EEE",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  editButtonText: {
    fontSize: 14,
    color: "#000",
  },
});
