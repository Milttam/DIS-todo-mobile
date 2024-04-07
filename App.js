import { StatusBar } from 'expo-status-bar';
import { Platform, FlatList, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import Task from './components/Task';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [items, setItems] = useState([])

  const onAddTaskPress = (task) => {
    const addTask = async (t) => {
      const res = await fetch(`http://localhost:6968/api/tasks`, {
        method: "POST",
        headers: { "Content-type": "Application/json"},
        body: JSON.stringify({taskName: t.text}), // why do we need to stringify here?
      });
      const data = await res.json();
      setItems(data);
    }
 
    addTask(task);
  }

  const onTaskPress = (index) => {
    // change so we are calling the backend to check off the task then in the backend push it to the back
    const checkTask = async (t) => {
      const res = await fetch(`http://localhost:6968/api/tasks/${index}`, {
        method: "PUT",
        headers: { "Content-type": "Application/json"},
        body: JSON.stringify({newTitle: t.title,taskName: t.text}), // why do we need to stringify here?
      });
      const data = await res.json();
      setItems(data);
    }
 
    addTask(task);
    
    const newItems = [...items]
    newItems[index].isChecked = !newItems[index].isChecked
    newItems.push(newItems.splice(index, 1)[0]);
    setItems(newItems)
  }

 const onDeleteTaskPress = (index) => {
    // Change so we are calling the backend to delete the task
    // Change local items and backend 
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems) 
  }

  useEffect(() => {
    // Need to change so we fetch the tasks from backend, not async storage
    const getData = async () => {
      const res = await fetch(`http://localhost:6968/api/`, {
        method: "GET",
      });
      const data = await res.json();
      console.log(data)
      setItems(data);
    }

    getData()
    console.log("reached here!")
    console.log(items)
  }, [])

  const renderItem = ({item, index}) => {
    return (
      <Task 
        key = {index}
        index = {index}
        text = {item.title} 
        checked = {item.isChecked}
        onPress = {() => onTaskPress(index)}
        onPressDelete = {() => onDeleteTaskPress(index)}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Tasks</Text>
      <FlatList
        data = {items}
        renderItem = {renderItem}
        style = {{paddingBottom: 20, paddingTop: 20, width: '100%'}}
        contentContainerStyle={{flexGrow: 1}}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style = {styles.addTaskContainer}
      >
        <AddTask
          text = {"Add text here"} 
          onPress = {onAddTaskPress}
          style = {styles.addTaskContainer}
        />
      </KeyboardAvoidingView>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f1f1',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 49,
    paddingLeft: 16,
    paddingRight: 16,
    boxShadow: '0px 0px 14px 20px rgba(0, 0, 0, 0.10)',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 32,
    paddingTop: 16,
  },
  addTaskContainer:{
    width: '100%',
    flexDirection: 'row',
    padding: 16,
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginBottom: 20,
  },
});
