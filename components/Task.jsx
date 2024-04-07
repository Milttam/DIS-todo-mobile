import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';

const Task = ({ index, text, checked, onPress, onPressDelete }) => {

  const onTaskPress = () => {
    // If the task is not checked, check it off
    if (!checked) {
      onPress(index, text)
    }
  }

  const onDeleteTask = () => {
    onPressDelete(index)
  }

  return (
      <TouchableOpacity 
        style = {[styles.container, styles.shadowProp]}
        onPress = {onTaskPress}
      >
          <Text style = {styles.checkbox}>{checked && <Text style = {styles.checkmark}>&#10003;</Text>}</Text>
          <Text style = {[styles.text, checked ? styles.slashedText : null]}>{text}</Text>
          <TouchableOpacity style={styles.trashButton} onPress={onDeleteTask}>
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    width: '100%',
    padding: 16,
    gap: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  }, 
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  checkbox: {
    width: 24,
    height: 24,
    backgroundColor:"#8de9da66",
    borderRadius: 4,
  }, 
  checkmark: {
    color: "#000",
    fontSize: 16,
    textAlign: 'center',
  },
  slashedText: {
    textDecorationLine: 'line-through',
  },
  text: {
    fontSize: 16,
  },
  trashButton: {
    marginLeft: 'auto',
  },
});

export default Task;