import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Home({ navigation, route }) {
  const { idFuncionario } = route.params || {};

  console.log("Cód Funcionario: ", idFuncionario);
  console.log(route.params);

  const [nomeFuncionario, setNomeFuncionario] = useState("");
  const [cargoFuncionario, cargo] = useState("");

  useEffect(() => {
    const fetchFuncionarioData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const resposta = await axios.get(`http://127.0.0.1:8000/api/funcionario/${idFuncionario}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setNomeFuncionario(resposta.data.nomeFuncionario);
        cargo(resposta.data.cargo);
        console.log(resposta.data);
      } catch (error) {
        console.error("Erro ao buscar dados do funcionário", error);
      }
    };
    if (idFuncionario) {
      fetchFuncionarioData();
    }
  }, [idFuncionario]);


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>

      <View style={{ backgroundColor: 'grey', width: '100%', height: 60, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
        <Image source={require('../../../assets/perfil.png')} style={{ width: 50, height: 50 }} />
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>{nomeFuncionario}</Text>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>{cargoFuncionario}</Text>
      </View>

      <ImageBackground source={require('../../../assets/background.png')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}  >
        <ScrollView>
          <Text style={styles.text}>Seja bem vindo {nomeFuncionario}</Text>
          <Text style={styles.Title}>Home</Text>

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <View style={styles.caixa}>
              <View style={styles.textoContainer}>
                <Text style={styles.textoNumerico}>12</Text>
                <Text style={styles.textoTitulo}>Mensagens</Text>
              </View>
              <Image
                source={require('../../../assets/perfil.png')}
                style={styles.imagem}
              />
            </View>
            <View style={styles.caixa}>
              <View style={styles.textoContainer}>
                <Text style={styles.textoNumerico}>12</Text>
                <Text style={styles.textoTitulo}>Mensagens</Text>
              </View>
              <Image
                source={require('../../../assets/perfil.png')}
                style={styles.imagem}
              />
            </View>
            <View style={styles.caixa}>
              <View style={styles.textoContainer}>
                <Text style={styles.textoNumerico}>12</Text>
                <Text style={styles.textoTitulo}>Mensagens</Text>
              </View>
              <Image
                source={require('../../../assets/perfil.png')}
                style={styles.imagem}
              />
            </View>
            <View style={styles.caixa}>
              <View style={styles.textoContainer}>
                <Text style={styles.textoNumerico}>12</Text>
                <Text style={styles.textoTitulo}>Mensagens</Text>
              </View>
              <Image
                source={require('../../../assets/perfil.png')}
                style={styles.imagem}
              />
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.caixaMenor}>
                <Image
                  source={require('../../../assets/perfil.png')}
                  style={styles.imagem}
                />
                <View style={styles.textoContainer}>
                  <Text style={styles.textoNumerico}>12</Text>
                  <Text style={styles.textoTitulo}>Mensagens</Text>
                </View>
              </View>

              <View style={{ width: 154, height: 102, backgroundColor: '#FF9F00', padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, }}>
                <Image
                  source={require('../../../assets/perfil.png')}
                  style={styles.imagem}
                />
                <View style={styles.textoContainer}>
                  <Text style={styles.textoNumerico}>12</Text>
                  <Text style={styles.textoTitulo}>Mensagens</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

    </View>
  );
}

const styles = StyleSheet.create({

  caixa: {
    width: 318,
    height: 102,
    backgroundColor: 'rgba(255, 255, 255, 0.66)',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'space-around'
  },
  // textoContainer: {
  //   marginRight: 'auto', // Isso empurra o texto para a esquerda e a imagem para a direita
  // },
  textoNumerico: {
    fontSize: 33,
    marginBottom: 5,
  },
  textoTitulo: {
    fontSize: 15,
  },
  imagem: {
    width: 50, // Ajuste conforme necessário
    height: 50, // Ajuste conforme necessário
    marginLeft: 10,
  },


  caixaMenor: {
    width: 154,
    height: 102,
    backgroundColor: '#004FFF', // Cor alterada para azul
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginRight: 10, // Margem direita entre as caixas
  },



  img: {
    width: 150,
    height: 150,
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

  btn: {
    width: 250,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },

  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  input: {
    width: 250,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },

});

