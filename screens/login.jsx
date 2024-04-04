import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../context/auth_context";

const Login = ({ navigation }) => {
  //importa o login do context
  const { login } = useContext(AuthContext);

  //estados que armazenam as informações utilizadas e modificadas nessa tela
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login({ username, password });
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
          marginBottom: 50,
          width: "100%",
          marginTop: 50,
        }}
      >
        <Image
          style={{ width: 50, height: 40, marginLeft: 10 }}
          source={require("../assets/logo.png")}
        />
        <Text
          style={{
            marginRight: 20,
            fontSize: 25,
            fontWeight: "bold",
            color: "#0b1f51",
          }}
        >
          Log in
        </Text>
      </View>
      <Image
        style={{ width: 150, height: 40, marginLeft: 10, marginTop: 50 }}
        source={require("../assets/title.png")}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 80,
        }}
      >
        <View>
          <Text style={{ fontWeight: "500", color: "gray", marginBottom: 5 }}>
            Insira seu username
          </Text>
          <TextInput
            placeholder="Username"
            style={{
              backgroundColor: "white",
              width: 350,
              borderRadius: 5,
              height: 55,
              padding: 10,
              marginBottom: 30,
              borderColor: "gray",
              borderWidth: 1,
            }}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>

        <View>
          <Text style={{ fontWeight: "500", color: "gray", marginBottom: 5 }}>
            Insira sua senha
          </Text>
          <TextInput
            placeholder="Password"
            style={{
              backgroundColor: "white",
              width: 350,
              borderRadius: 5,
              height: 55,
              padding: 10,
              marginBottom: 30,
              borderColor: "gray",
              borderWidth: 1,
            }}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <TouchableOpacity
          style={{
            marginTop: -20,
            backgroundColor: "#fff",
            width: 350,
            height: 55,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={{ color: "#261a66", fontSize: 15, fontWeight: "bold" }}>
            Esqueceu sua senha?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 10,
            backgroundColor: "#4530B3",
            width: 350,
            height: 55,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleLogin}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Log In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 30,
            backgroundColor: "#fff",
            width: 350,
            height: 55,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={{ color: "#261a66", fontSize: 15, fontWeight: "bold" }}>
            Ainda não tem uma conta? Cadastre-se aqui
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
