import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
  Pressable,
  TextInput,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Menu({ navigation }) {
  const [nomeFuncionario, setNomeFuncionario] = useState("");
  const [cargoFuncionario, setCargoFuncionario] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDescriptionVisible, setModalDescriptionVisible] = useState(false);
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchFuncionarioData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("Token de autenticação não encontrado.");
      const resposta = await axios.get(
        `http://127.0.0.1:8000/api/funcionario/${idFuncionario}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNomeFuncionario(resposta.data.nomeFuncionario);
      setCargoFuncionario(resposta.data.cargo);
    } catch (error) {
      console.error("Erro ao buscar dados do funcionário:", error.message);
    }
  };


  // Função para buscar produtos da API
  const fetchProducts = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("Token de autenticação não encontrado.");
      }

      const response = await fetch("http://127.0.0.1:8000/api/cardapio", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error.message);
    }
  };

  const selectImage = () => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
      }
    });
  };

  const showDescriptionModal = (product) => {
    setCurrentProduct(product);
    setModalDescriptionVisible(true);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <View
        style={{
          backgroundColor: "#000",
          width: "100%",
          height: 60,
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Image
          source={require("../../../assets/perfil.png")}
          style={{ width: 40, height: 40 }}
        />
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Joao Silva
        </Text>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Administrador
        </Text>
      </View>

      <ImageBackground
        source={require("../../../assets/background2.png")} 
        style={{ flex: 1, alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}
      >
        <ScrollView>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text style={styles.text}>Seja bem vindo Joao Silva</Text>
            <Text style={styles.Title}>Menu</Text>

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
                      <Text style={styles.modalTitle}>Adicionar prato</Text>
                      {imageUri ? (
                        <Image
                          source={{ uri: imageUri }}
                          style={styles.modalImage}
                        />
                      ) : (
                        <Image
                          source={require("../../../assets/camera.png")}
                          style={styles.modalImage}
                        />
                      )}
                      <Pressable
                        style={styles.imageButton}
                        onPress={selectImage}
                      >
                        <Text style={styles.imageButtonText}>
                          Alterar imagem
                        </Text>
                      </Pressable>
                      <TextInput
                        style={styles.input}
                        placeholder="Nome do prato"
                        value={dishName}
                        onChangeText={setDishName}
                      />
                      <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Descreva o prato"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={4}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="R$ 00,00"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                      />
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
                              const token = await AsyncStorage.getItem("userToken");
                              const formData = new FormData();
                              formData.append("nomeProduto", dishName);
                              formData.append("descricaoProduto", description);
                              formData.append("valorProduto", price);
                              formData.append("categoriaProduto", "comida"); // Adapte a categoria conforme necessário
                              if (imageUri) {
                                const uriParts = imageUri.split(".");
                                const fileType = uriParts[uriParts.length - 1];
                                formData.append("fotoProduto", {
                                  uri: imageUri,
                                  type: `image/${fileType}`,
                                  name: `photo.${fileType}`,
                                });
                              }
                              await fetch("http://127.0.0.1:8000/api/cardapio", {
                                method: "POST",
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                  "Content-Type": "multipart/form-data", // Corrigido para multipart/form-data
                                },
                                body: formData,
                              });
                              fetchProducts(); // Atualiza a lista de produtos
                              setModalVisible(!modalVisible);
                              setDishName("");
                              setDescription("");
                              setPrice("");
                              setImageUri(null);
                            } catch (error) {
                              console.error("Erro ao adicionar prato:", error);
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
                  <Text style={styles.addText}>Adicionar prato</Text>
                </Pressable>
              </View>

              {/* Renderiza os produtos da API */}
              {products.length > 0 ? (
                products.map((product) => (
                  <View key={product.idProduto} style={styles.foodCard}>
                    <View style={styles.foodImageContainer}>
                      <Image
                        source={{
                          uri: `http://127.0.0.1:8000/assets/images/cardapio/${product.fotoProduto}`,
                        }}
                        style={styles.foodImage}
                        defaultSource={require("../../../assets/comida.png")} // Imagem padrão
                        onError={(e) =>
                          console.log(
                            "Erro ao carregar a imagem:",
                            e.nativeEvent.error
                          )
                        } // Log para erros de carregamento
                      />
                    </View>
                    <View style={styles.foodContent}>
                      <Text style={styles.foodTitle}>
                        {product.nomeProduto}
                      </Text>
                      <Text
                        style={styles.foodDescription}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {product.descricaoProduto}
                      </Text>
                      <Text style={styles.foodPrice}>
                        R$ {Number(product.valorProduto).toFixed(2)}
                      </Text>{" "}
                      {/* Garantindo que valorProduto é um número */}
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => showDescriptionModal(product)}
                      >
                        <Text style={styles.editButtonText}>Editar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.text}>Nenhum prato disponível</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Modal para exibir a descrição completa do produto */}
      {currentProduct && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalDescriptionVisible}
          onRequestClose={() => {
            setModalDescriptionVisible(!modalDescriptionVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{currentProduct.nomeProduto}</Text>
              <Text style={styles.modalDescription}>
                {currentProduct.descricaoProduto}
              </Text>
              <Pressable
                style={styles.button}
                onPress={() => setModalDescriptionVisible(!modalDescriptionVisible)}
              >
                <Text style={styles.buttonText}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
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
  
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  addCard: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  addContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  addIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  addText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  foodCard: {
    flexDirection: "row",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    width: "100%",
  },
  foodImageContainer: {
    flex: 1,
  },
  foodImage: {
    width: "100%",
    height: 100,
  },
  foodContent: {
    flex: 2,
    padding: 10,
  },
  foodTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  foodDescription: {
    fontSize: 12,
    color: "#666",
    marginVertical: 5,
    textAlign: "center",
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxHeight: 40, // Ajuste a altura máxima se necessário
  },
  foodPrice: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  editButton: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonAdd: {
    backgroundColor: "#007BFF",
  },
  buttonCancel: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  imageButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
