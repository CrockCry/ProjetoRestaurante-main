import * as React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ImageBackground} from "react-native";
import { useState } from "react";
import Modal from "react-native-modal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [isFocused, setIsFocused] = React.useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      setErrorModalVisible(true);
      return;
    }
  
    try {
      const resposta = await axios.post(`http://127.0.0.1:8000/api/login?email=${email}&senha=${senha}`);
      if (resposta.data) {
        const funcionario = resposta.data;
  
        if (funcionario) {
          console.log(funcionario);
          console.log(funcionario.usuario.dados_funcionario.idFuncionario);
          console.log(funcionario.usuario.dados_funcionario.nomeFuncionario);
          console.log(funcionario.access_token);
  
          const idFuncionario = funcionario.usuario.dados_funcionario.idFuncionario;
          const token = funcionario.access_token;
  
          await AsyncStorage.setItem('userToken', token);
  
          navigation.navigate('Home', { idFuncionario });
        }
      }
  
    } catch (error) {
      console.error("Erro ao verificar o email e a senha", error);
      setErrorModalVisible("ERRO", "Erro ao verificar email e senha");
    }
  };
  


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/background2.png")} style={{ flex: 1, alignItems: "center", justifyContent: "center", width: "100%", height:"100%"}}>
        
        <Image style={{ alignItems: "center", justifyContent: "center", width: "240px", height:"80px"}} source={require("../../../assets/MM-Logo-white.svg")}/>
        <Text style={styles.text}>Bem-vindo</Text>

        <TextInput
          style={[styles.input, isFocused && styles.focusedInput]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          require={true}
        />
         <TextInput
          secureTextEntry={true}
          style={[styles.input, isFocused && styles.focusedInput]}
          value={senha}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={setSenha}
          placeholder="Senha"
        />

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Senha")}>
          <Text style={styles.pass}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </ImageBackground>

      <Modal isVisible={errorModalVisible} onBackdropPress={() => setErrorModalVisible(false)}>
          <View style={styles.errorModalVisible}>
            <Text style={styles.errorModalTittle}>Erro</Text>
            <Text style={styles.errorModalMessage}>Email ou senha incorretos. Tente Novamente.</Text>
            <TouchableOpacity onPress={()=> setErrorModalVisible(false)}>
              <Text style={styles.errorModalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },

  img: {
    width: 150,
    height: 150,
  },

  text: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },

  btn: {
    width: 150,
    height: 50,
    backgroundColor: "#3DA4FF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },

  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  input: {
    width: 250,
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },

  pass: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
    cursor: "pointer",
  },

  errorModalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  errorModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  errorModalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    backgroundColor: "#fff",
    width: 250,
    padding: 15,
    alignSelf: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.19,
    shadowRadius: 20,
    elevation: 10, // Ajuste a intensidade da sombra no Android
    shadowColor: '#000', // Sombra adicional
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.23,
    shadowRadius: 6,
  },

  errorModalButtonText:{
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    backgroundColor: "#3DA4FF",
    width: 100,
    padding: 15,
    alignSelf: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.19,
    shadowRadius: 20,
    elevation: 10, // Ajuste a intensidade da sombra no Android
    shadowColor: '#000', // Sombra adicional
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.23,
    shadowRadius: 6,
    color: "#fff"
  },

  errorModalClose: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
});
