import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';

export default function Senha() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#9bc53d' }}>
      <ImageBackground source={require('../../../assets/background.png')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Text style={styles.text}>Recuperação de Senha</Text>
        <Image style={styles.imgLogo} source={require('../../../assets/logo.png')} />


        <TextInput
          style={styles.input}
          placeholder="Email"
          require={true}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Cpf"

        />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.btnTextVolta}>Voltar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.btnText}>Enviar</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>

    </View>
  );
}

const styles = StyleSheet.create({
  imgLogo: {
    width: 100,
    height: 100,
  },

  img: {
    width: 150,
    height: 150,
  },

  text: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },

  btn: {
    width: 150,
    height: 50,
    backgroundColor: '#3DA4FF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },

  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  btnTextVolta: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 20,
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

