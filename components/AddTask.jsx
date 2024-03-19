import React from "react";
import { Keyboard, Platform, TextInput, StyleSheet, Text, View, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const AddTask = (props) => {
  const [task, setTask] = useState("")

  const handleAddTask = () => {
    if (task.length != 0) {
      props.onPress({text: task, isChecked: false});
      setTask("");
      Keyboard.dismiss();
    }
    
  }
  
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Add a new task" 
        onChangeText={text => setTask(text)}
        value={task}
      />
      <TouchableOpacity onPress={handleAddTask} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 50,
    marginRight: 10,
  },
  buttonContainer: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddTask;
