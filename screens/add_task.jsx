import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const AddTask = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleAddTask = () => {
    // Aqui você pode implementar a lógica para adicionar a tarefa
    console.log("Descrição:", description);
    console.log("Data de conclusão:", completionDate);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setCompletionDate(date.toLocaleDateString());
    hideDatePicker();
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
          style={{ marginLeft: 10 }}
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
          marginTop: 50,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
 
        >
          <Text style={{ fontWeight: "500", color: "gray", marginBottom: 5 }}>
            Insira seu username
          </Text>
          <TextInput
            placeholder="Descrição da tarefa"
            style={[styles.input, { height: 100, width:370 }]} // Definindo uma altura de 100 unidades
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline={true} // Permitindo múltiplas linhas
          />
        </View>

        {/* Data de conclusão da tarefa */}
        <TouchableOpacity style={styles.input} onPress={showDatePicker}>
          <Text>
            {completionDate ? completionDate : "Selecionar data de conclusão"}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
          textColor="#4530B3" // Cor do texto
          backgroundColor="#FFFFFF" // Cor de fundo
          headerBackgroundColor="#0b1f51" // Cor do cabeçalho
        />

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
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    justifyContent: "center",
  },
  addButton: {
    backgroundColor: "#4530B3",
    width: "90%",
    height: 55,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddTask;
