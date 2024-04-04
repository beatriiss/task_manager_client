import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Switch } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../context/auth_context";
import TaskComponent from "../components/task";

const Dashboard = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCompletedTasks, setShowCompletedTasks] = useState(false); // Estado para controlar se as tarefas concluídas devem ser exibidas
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    if (!currentUser) return;
    const user = JSON.parse(currentUser);
    try {
      const response = await axios.get(`http://192.168.0.112:3333/tasks/find/${user.id}`);
      setTasks(response.data);
      console.log(tasks);
    } catch (error) {
      console.error("Erro ao obter tarefas:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Lógica de busca aqui...
  };

  // Função para alternar entre mostrar e ocultar as tarefas concluídas
  const toggleShowCompletedTasks = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
        />
        <Text style={styles.headerTitle}>Tarefas</Text>
      </View>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
          value={searchQuery}
          onChangeText={handleSearch}
          cursorColor={"gray"}
        />
      </View>
      {/* Adicionando o Switch */}
      <View style={styles.switchContainer}>
        <Text>Mostrar tarefas concluídas</Text>
        <Switch
          value={showCompletedTasks}
          onValueChange={toggleShowCompletedTasks}
        />
      </View>
      <View style={styles.resultsContainer}>
        {tasks.length > 0 ? (
          tasks
            // Aplicando filtro para mostrar ou ocultar tarefas concluídas com base no estado do Switch
            .filter(task => showCompletedTasks || !task.completed)
            .map((task, index) => (
              <TaskComponent key={index} task={task} />
            ))
        ) : (
          <Text style={styles.noTasksText}>Nenhuma tarefa encontrada.</Text>
        )}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Add_task")}>
        <FontAwesome name="plus" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
    marginTop: 50,
  },
  logo: {
    width: 50,
    height: 40,
    marginLeft: 20,
  },
  headerTitle: {
    marginRight: 20,
    fontSize: 25,
    fontWeight: "bold",
    color: "#0b1f51",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: "gray",
    borderRadius: 8,
    width: "90%",
    height:50
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  resultsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  noTasksText: {
    fontSize: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 40,
    right: 30,
    backgroundColor: "#4530b3",
    padding: 0,
    borderRadius: 50,
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
});

export default Dashboard;
