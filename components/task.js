import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import axios from "axios";

const TaskComponent = ({ task, onDelete }) => {
  const [updating, setUpdating] = useState(false);

  const handleCheckboxClick = async () => {
    if (updating) return;
    setUpdating(true);
    try {
      await axios.put(`http://192.168.0.112:3333/tasks/update/${task.id}`, {
        completed: !task.completed,
      });
      task.completed = !task.completed;
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://192.168.0.112:3333/tasks/delete/${task.id}`);
      onDelete()
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
    }
  };

  return (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{task.description}</Text>
      <View style={styles.item}>
        <CheckBox
          checked={task.completed}
          onPress={handleCheckboxClick}
          checkedColor="#0b1f51"
          uncheckedColor="gray"
        />
        <TouchableOpacity onPress={handleDeleteClick}>
          <Icon name="delete" type="material" color="#f54d4c" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 5,
    width: "100%",
    justifyContent: "space-between",
    borderRadius: 10,
    borderColor: "#241471",
    paddingHorizontal: 10,
    borderWidth: 1.5,
  },
  taskText: {
    fontSize: 16,
    color: "#000",
  },
  item:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  }
});

export default TaskComponent;
