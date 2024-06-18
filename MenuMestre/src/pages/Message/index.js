import * as React from "react";
import { useState } from "react";
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
  Modal,
  Pressable,
  Alert,
  Picker,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Message({ navigation }) {
  const [filter, setFilter] = useState("");
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const applyFilter = (filterType) => {
    setFilter(filterType);
    setFilterModalVisible(false);
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
        <Text style={styles.text}>Seja bem vindo Usuario</Text>
        <Text style={styles.Title}>Menu</Text>

        <View style={styles.searchContainer}>
          <TextInput placeholder="Pesquisar" style={styles.searchInput} />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <Ionicons name="filter" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.messageBox}>
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>Nome pessoa</Text>
              <Text style={styles.messageDate}>Data: 14/08</Text>
            </View>
            <Text style={styles.messageTitle}>Titulo mensagem</Text>
            <Text style={styles.messagePreview}>Preview mensagem</Text>
          </View>
          <View style={styles.messageBox}>
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>Nome pessoa</Text>
              <Text style={styles.messageDate}>Data: 14/08</Text>
            </View>
            <Text style={styles.messageTitle}>Titulo mensagem</Text>
            <Text style={styles.messagePreview}>Preview mensagem</Text>
          </View>
          <View style={styles.messageBox}>
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>Nome pessoa</Text>
              <Text style={styles.messageDate}>Data: 14/08</Text>
            </View>
            <Text style={styles.messageTitle}>Titulo mensagem</Text>
            <Text style={styles.messagePreview}>Preview mensagem</Text>
          </View>
        </ScrollView>

        <Modal
          animationType="fade"
          transparent={true}
          visible={filterModalVisible}
          onRequestClose={() => {
            Alert.alert("Filter modal has been closed.");
            setFilterModalVisible(!filterModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Filtrar</Text>
              <Pressable
                style={styles.filterOption}
                onPress={() => applyFilter("az")}
              >
                <Text style={styles.filterText}>Ordem de A-Z</Text>
              </Pressable>
              <Pressable
                style={styles.filterOption}
                onPress={() => applyFilter("za")}
              >
                <Text style={styles.filterText}>Ordem de Z-A</Text>
              </Pressable>
              <Pressable
                style={styles.filterOption}
                onPress={() => applyFilter("ativos")}
              >
                <Text style={styles.filterText}>Ativos</Text>
              </Pressable>
              <Pressable
                style={styles.filterOption}
                onPress={() => applyFilter("desativos")}
              >
                <Text style={styles.filterText}>Desativos</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setFilterModalVisible(!filterModalVisible)}
              >
                <Text style={styles.buttonText}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  filterText: {
    fontSize: 16,
  },
  // Adicione o estilo para o botão de fechar
  buttonClose: {
    backgroundColor: "#2196F3",
  },

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
  modalImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  imageButton: {
    marginBottom: 20,
  },
  imageButtonText: {
    color: "#2196F3",
    fontSize: 14,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  pickerContainer: {
    width: "100%",
    marginBottom: 10,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
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
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    alignItems: "center",
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
  searchContainer: {
    flexDirection: "row",
    width: "82%",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  filterButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: "white",
    borderRadius: 30,
  },
  messageBox: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    marginBottom: 20,
    width: 320,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  messageHeader: {
    marginRight: 10,
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  messageTitle: {
    marginBottom: 5,
  },
  messagePreview: {
    color: "gray",
  },
});
