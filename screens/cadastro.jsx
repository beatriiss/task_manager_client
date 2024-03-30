import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCadastro = () => {
    // Aqui você pode implementar a lógica para fazer a solicitação de login usando Axios
    axios.post("http://192.168.1.102:3333/user/login", { username, password })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 50, width: "100%", marginTop: 50 }}>
        <Image
          style={{ width: 50, height: 40, marginLeft: 10 }}
          source={require("../assets/logo.png")}
        />
        <Text style={{ marginRight: 20, fontSize: 25, fontWeight: "bold", color: "#0b1f51" }}>Sing Up</Text>
      </View>
      <Image
        style={{ width: 150, height: 40, marginLeft: 10, marginTop: 50 }}
        source={require("../assets/title.png")}
      />
      <View style={{ justifyContent: "center", alignItems: "center", marginTop: 80 }}>
        <View>
          <Text style={{ fontWeight: "500", color: "gray", marginBottom: 5 }}>Insira seu username</Text>
          <TextInput
            style={{
              backgroundColor: "white",
              width: 350,
              borderRadius: 5,
              height: 55,
              padding: 10,
              marginBottom: 30,
              borderColor: "gray",
              borderWidth: 1
            }}
            value={username}
            onChangeText={(text)=>setUsername(text)}
          />
        </View>
        <View>
          <Text style={{ fontWeight: "500", color: "gray", marginBottom: 5 }}>Insira seu e-mail</Text>
          <TextInput
            style={{
              backgroundColor: "white",
              width: 350,
              borderRadius: 5,
              height: 55,
              padding: 10,
              marginBottom: 30,
              borderColor: "gray",
              borderWidth: 1
            }}
            value={email}
            onChangeText={(text)=>setEmail(text)}
          />
        </View>

        <View>
          <Text style={{ fontWeight: "500", color: "gray", marginBottom: 5 }}>Insira sua senha</Text>
          <TextInput
            style={{
              backgroundColor: "white",
              width: 350,
              borderRadius: 5,
              height: 55,
              padding: 10,
              marginBottom: 30,
              borderColor: "gray",
              borderWidth: 1
            }}
            secureTextEntry={true}
            value={password}
            onChangeText={(text)=>setPassword(text)}
          />
        </View>

        <TouchableOpacity
          style={{
            marginTop: 10,
            backgroundColor: "#4530B3",
            width: 350,
            height: 55,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={handleCadastro}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Sing up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 30,
            backgroundColor: "#fff",
            width: 350,
            height: 55,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ color: "#261a66", fontSize: 15, fontWeight: "bold" }}>Já tem uma conta? Vá para o login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
