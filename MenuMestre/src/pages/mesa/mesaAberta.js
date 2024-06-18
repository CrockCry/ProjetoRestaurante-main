import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";

export default function mesaAberta({ navigation }) {
  const addMesa = () => {
    navigation.navigate("addMesa");
  };
  return (
    <SafeAreaView style={styles.container}>
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
        <Text style={styles.header}>Produtos a mesa</Text>
        <View style={styles.card}>
          <Text style={styles.title}>Mesa 3 - Ocupada</Text>
          <Text style={styles.subtitle}>
            3/4{" "}
            <Image
              source={require("../../../assets/user.png")}
              style={{ width: 16, height: 16 }}
            />
          </Text>
          <TouchableOpacity style={styles.addButton} onPress={addMesa}>
            <Text style={styles.addButtonText}>Adicionar produtos a mesa</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Produtos</Text>
          <View style={styles.productsBox}>
            <Text>Mesa vazia</Text>
          </View>
          <Text style={styles.totalText}>Total da mesa: R$ 0,00</Text>
          <Text style={styles.serviceText}>Serviço de mesa: 10%</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.billButton} >
              <Text style={styles.billButtonText}>Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
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

  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    color: "#FFF",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productsBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  totalText: {
    fontSize: 14,
    marginBottom: 5,
  },
  serviceText: {
    fontSize: 14,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  billButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    width: "30%",
  },
  backButton: {
    backgroundColor: "#bbb",
    padding: 10,
    borderRadius: 5,
    width: "30%",
  },
  sendButton: {
    backgroundColor: "#FFC107",
    padding: 10,
    borderRadius: 5,
    width: "30%",
  },
  billButtonText: {
    color: "white",
    textAlign: "center",
  },
  backButtonText: {
    color: "black",
    textAlign: "center",
  },
  sendButtonText: {
    color: "white",
    textAlign: "center",
  },
});
