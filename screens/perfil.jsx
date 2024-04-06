import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../context/auth_context";


const Perfil = ({ navigation }) => {
  const { currentUser, editar,logout_context } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setUser(JSON.parse(currentUser));
      setUsername(user.username);
      setEmail(user.email);
      setPassword(user.password)
    }
  }, [currentUser]);

  const handleSave = async() => {
    await editar({Username, Email, Password, Id: user.id})
    setEditing(false); // Finaliza o modo de edição
  };
  const handleLogout = async() => {
    await logout_context()
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome
          onPress={() => navigation.navigate("Dashboard")}
          style={styles.logo}
          name="arrow-left"
          size={25}
          color="#0b1f51"
        />
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>
      <FontAwesome
        name="user"
        size={185}
        color="#2b0f51"
        style={{ marginTop: 70 }}
      />

      {user && (
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Nome de Usuário:</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={Username}
              onChangeText={setUsername}
            />
          ) : (
            <Text style={styles.value}>{user.username}</Text>
          )}

          <Text style={styles.label}>Email:</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={Email}
              onChangeText={setEmail}
            />
          ) : (
            <Text style={styles.value}>{user.email}</Text>
          )}
          {editing ? (
            <View>
              <Text style={styles.label}>Password:</Text>
              <TextInput
                style={styles.input}
                value={Password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>
          ) : null}

          {editing ? (
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setEditing(true)}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button_logout}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
  headerTitle: {
    marginRight: 20,
    fontSize: 25,
    fontWeight: "bold",
    color: "#0b1f51",
  },
  profileInfo: {
    width: "80%",
    marginTop: 70,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 18,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
  },
  logo: {
    width: 50,
    height: 40,
    marginLeft: 20,
  },
  button: {
    backgroundColor: "#0b1f51",
    width: "100%",
    height: 55,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  button_logout: {
    backgroundColor: "#f54d4c",
    width: "100%",
    height: 55,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    gap: 20,
  },
});

export default Perfil;
