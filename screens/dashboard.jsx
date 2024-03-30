import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../context/auth_context";

const Dasboard = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Aqui você pode implementar a lógica para realizar a busca no seu array de dados
    // Neste exemplo, vou apenas simular uma busca filtrando os elementos do array
    const filteredResults = yourArray.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(filteredResults);
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
          Tarefas
        </Text>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <FontAwesome
          name="search"
          size={20}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Resultados da busca */}
      <View style={styles.resultsContainer}>
        {searchResults.map((result, index) => (
          <Text key={index} style={styles.resultItem}>
            {result}
          </Text>
        ))}
      </View>
      <TouchableOpacity style={styles.add} onPress={()=>navigation.navigate("Add_task")}>
        <FontAwesome
          name="plus"
          size={20}
          color="white"

        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    width: "95%",
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
  resultItem: {
    marginBottom: 10,
    fontSize: 16,
    color: "#333",
  },
  add: {
    position: "absolute",
    bottom: 40,
    right: 30,
    backgroundColor: "#4530b3",
    padding: 0,
    borderRadius: 50,
    width: 75,
    height: 75,
    justifyContent:'center',
    alignItems:'center'
  },
});

export default Dasboard;
