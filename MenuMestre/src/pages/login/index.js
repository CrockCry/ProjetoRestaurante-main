import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
// import { Modal } from "react-native-paper";
import Modal from 'react-native-modal';
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const response = await axios.post();  // Certifique-se de preencher a URL e os dados necessários aqui
      if (response.data) {
        const Funcionario = response.data;
        if (Funcionario) {
          console.log(Funcionario);
          console.log(Funcionario.acess_token);

          const idFuncionario = Funcionario;
          const Token = Funcionario.acess_token;

          // Armazenar token na memória do app (asyncStorage)
          await AsyncStorage.setItem("userToken", Token);

          navigation.navigate("Home", { idFuncionario });
        }
      }
    } catch (error) {
      console.error("Erro ao verificar o email e a senha");
      setErrorModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/background.png")}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Image
          style={styles.imgLogo}
          source={require("../../../assets/logo.png")}
        />

        <Text style={styles.text}>Bem-vindo</Text>

        <TextInput
          style={[styles.input, isFocused && styles.focusedInput]}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          require={true}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TextInput
          secureTextEntry={true}
          style={[styles.input, isFocused && styles.focusedInput]}
          value={senha}
          onChangeText={setSenha}
          placeholder="Senha"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={handleLogin}
        >
          <Text style={styles.btnText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Senha")}>
          <Text style={styles.pass}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </ImageBackground>

      <Modal isVisible={errorModalVisible} onBackdropPress={() => setErrorModalVisible(false)}> 
        <View style={styles.errorModalContainer}> 
          <Text style={styles.errorModalTitle}>Erro</Text>
          <Text style={styles.errorModalMessage}>Email ou senha inválidos</Text>
          <TouchableOpacity onPress={() => setErrorModalVisible(false)}>
            <Text style={styles.errorModalClose}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  imgLogo: {
    width: 100,
    height: 100,
  },

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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  errorModalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },

  errorModalClose: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
