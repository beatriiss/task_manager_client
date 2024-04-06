import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert // Importando o componente de alerta do React Native
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../context/auth_context";
import showFlashMessage from "../components/message";
import { url } from "../config/url";

const AddTask = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [description, setDescription] = useState("");

  const handleAddTask = async () => {
    const user = JSON.parse(currentUser);
    console.log(user.id);
    try {
      if (!description || description.trim() === '') { // Verifica se a descrição está vazia ou em branco
        showFlashMessage("A descrição da tarefa não pode estar vazia!", "danger");
        return; // Sai da função se a descrição estiver vazia
      }
      
      // Aqui estamos fazendo uma requisição POST para o endpoint de criação de tarefa
      const response = await axios.post(
        `${url}tasks/create`,
        {
          user_id: user.id, // Obtendo o id do usuário atual
          description: description, // Supondo que 'description' é uma variável no escopo do componente
        }
      );
      showFlashMessage("Tarefa adicionada!", "success");
      Alert.alert(
         `Ei, ${user.username}`,
        "Deseja adicionar outra tarefa?",
        [
          {
            text: "Sim",
            onPress: () => {
              setDescription(""); // Limpar o campo de descrição
            },
          },
          {
            text: "Não",
            onPress: () => {
              setDescription(""); // Limpar o campo de descrição
              navigation.navigate("Dashboard"); // Navegar para a tela Dashboard
            },
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      showFlashMessage("Erro ao criar tarefa!", "danger");
    }
  };
  

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
          width: "100%",
          marginTop: 50,
        }}
      >
        <FontAwesome
          name="arrow-left"
          size={25}
          color="#261a66"
          style={{ marginLeft: 12 }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            marginRight: 20,
            fontSize: 25,
            fontWeight: "bold",
            color: "#0b1f51",
          }}
        >
          Adicionar Tarefa
        </Text>
      </View>

      <View
        style={{
          marginTop: 30,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontWeight: "600", color: "gray", marginBottom: 5 }}>
            Insira a descrição da sua tarefa
          </Text>
          <TextInput
          cursorColor={"gray"}
            style={[styles.input, { height: 100, width: 370 }]}
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline={true}
            textAlignVertical="top" // Definindo o texto para começar do topo
          />
        </View>

        {/* Botão para adicionar tarefa */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Adicionar Tarefa
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    justifyContent: "center"
  },
  addButton: {
    backgroundColor: "#0b1f51",
    width: "90%",
    height: 55,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddTask;
