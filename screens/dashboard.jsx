import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../context/auth_context";
import TaskComponent from "../components/task";

const Dashboard = ({ navigation }) => {
  // importa o usuário logado do contexto
  const { currentUser } = useContext(AuthContext);

  // estados que armazenam os valores utilizados nessa tela
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [user, setUser] = useState(null);

  // função que busca as tarefas do usuário logado
  const fetchTasks = async () => {
    if (!currentUser) return;
    const user = JSON.parse(currentUser);
    setUser(JSON.parse(currentUser));
    try {
      const response = await axios.get(
        `http://192.168.0.112:3333/tasks/find/${user.id}`
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao obter tarefas:", error);
    }
  };

  // chama a função que busca as tarefas sempre que a tela é aberta
  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  // verifica se o teclado está acionado para exibir ou não o botão
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const toggleShowCompletedTasks = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerTitle}>Tarefas</Text>
      <FontAwesome style={styles.logo} name="user"  size={30} color="#0b1f51" />

      </View>

      <View style={styles.switchContainer}>
        <Text style={{ fontWeight: 600, marginLeft: 10, fontSize: 16 }}>
          Mostrar tarefas concluídas
        </Text>
        <Switch
          value={showCompletedTasks}
          onValueChange={toggleShowCompletedTasks}
          trackColor={{ false: "#767577", true: "#4550bb" }}
          thumbColor={showCompletedTasks ? "#261a66" : "#4550bb"}
        />
      </View>
      <View style={styles.resultsContainer}>
        {tasks.length > 0 ? (
          tasks
            .filter((task) => showCompletedTasks || !task.completed)
            .map((task, index) => (
              <TaskComponent key={index} task={task} onDelete={fetchTasks} />
            ))
        ) : (
          <View style={styles.taskContainer}>
            <Text style={styles.noTasksText}>Nenhum tarefa pendente</Text>
          </View>
        )}

        {tasks.filter((task) => showCompletedTasks || !task.completed)
          .length === 0 && (
          <View style={styles.taskContainer}>
            <Text style={styles.noTasksText}>Nenhuma tarefa pendente</Text>
          </View>
        )}
      </View>

      {!keyboardVisible && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Add_task")}
        >
          <FontAwesome name="plus" size={20} color="white" />
        </TouchableOpacity>
      )}
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
    marginBottom: 10,
    width: "100%",
    marginTop: 50,
  },
  logo: {
    width: 50,
    height: 40,
    marginLeft: 20,
  },
  headerTitle: {
    marginLeft: 20,
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
    height: 50,
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
    fontSize: 17,
    fontWeight: "500",
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
    width: "100%",
    justifyContent: "space-between",
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#241471",
    paddingHorizontal: 82,
    borderWidth: 1.5,
    paddingVertical: 15,
    marginTop:50
  },
});

export default Dashboard;
