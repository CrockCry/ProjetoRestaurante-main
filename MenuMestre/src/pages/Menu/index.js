import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView, Modal, Alert, Pressable, TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export default function Menu({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
      }
    });
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
            <Text style={styles.Title}>Menu</Text>

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
                      <Text style={styles.modalTitle}>Adicionar prato</Text>
                      {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.modalImage} />
                      ) : (
                        <Image source={require('../../../assets/camera.png')} style={styles.modalImage} />
                      )}
                      <Pressable style={styles.imageButton} onPress={selectImage}>
                        <Text style={styles.imageButtonText}>alterar imagem</Text>
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
                          onPress={() => {
                            // Adicionar ação aqui
                            setModalVisible(!modalVisible);
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
                  <Text style={styles.addText}>Adicionar prato</Text>
                </Pressable>
              </View>

              <View style={styles.foodCard}>
                <View style={styles.foodImageContainer}>
                  <Image source={require('../../../assets/comida.png')} style={styles.foodImage} />
                </View>
                <View style={styles.foodContent}>
                  <Text style={styles.foodTitle}>Grilled salmon</Text>
                  <Text style={styles.foodDescription}>Salmão grelhadinho na manteiga, acompanhado</Text>
                  <Text style={styles.foodPrice}>R$ 25,80</Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.foodCard}>
                <View style={styles.foodImageContainer}>
                  <Image source={require('../../../assets/comida.png')} style={styles.foodImage} />
                </View>
                <View style={styles.foodContent}>
                  <Text style={styles.foodTitle}>Grilled salmon</Text>
                  <Text style={styles.foodDescription}>Salmão grelhadinho na manteiga, acompanhado</Text>
                  <Text style={styles.foodPrice}>R$ 25,80</Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.foodCard}>
                <View style={styles.foodImageContainer}>
                  <Image source={require('../../../assets/comida.png')} style={styles.foodImage} />
                </View>
                <View style={styles.foodContent}>
                  <Text style={styles.foodTitle}>Grilled salmon</Text>
                  <Text style={styles.foodDescription}>Salmão grelhadinho na manteiga, acompanhado</Text>
                  <Text style={styles.foodPrice}>R$ 25,80</Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
              </View>

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
  modalImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  imageButton: {
    marginBottom: 20,
  },
  imageButtonText: {
    color: '#2196F3',
    fontSize: 14,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 80,
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
    width: '48%', // Garante que duas caixas caibam na linha
    height: 210,
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
  foodCard: {
    width: '48%', // Garante que duas caixas caibam na linha
    height: 210,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    marginBottom: 10,
    overflow: 'hidden',
  },

  foodImageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },

  foodImage: {
    borderRadius: 100,
    width: 65,
    height: 65,
  },
  foodContent: {
    padding: 10,
  },
  foodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  foodDescription: {
    fontSize: 12,
    color: '#666',
    marginVertical: 5,
    textAlign: 'cemter',
  },


  foodPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'right'
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


