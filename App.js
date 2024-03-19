import { StatusBar } from 'expo-status-bar';
import { Platform, FlatList, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import Task from './components/Task';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [items, setItems] = useState(
    [{text:"Walk the dog", isChecked:false}, 
    {text:"Take out the trash", isChecked:false}
  ])

  const onAddTaskPress = (task) => {
    setItems([...items, task])

    // UPDATE ASYNC STORAGE
    try {
      AsyncStorage.setItem('tasks', JSON.stringify(items))
    } catch (e) {
      console.log(e)
    }
  }

  const onTaskPress = (index) => {
    const newItems = [...items]
    newItems[index].isChecked = !newItems[index].isChecked
    newItems.push(newItems.splice(index, 1)[0]);
    setItems(newItems)
  
  }

 const onDeleteTaskPress = (index) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  useEffect(() => {
    const loadTasks = async () => {
      try{
        const storedTasks = await AsyncStorage.getItem('tasks')
        if (storedTasks != null){
          await AsyncStorage.setItem('tasks', JSON.stringify(items))
        }
      } catch(e){
        console.log(e)
      }
    }
    loadTasks()
  }, [])

  const renderItem = ({item, index}) => {
    return (
      <Task 
        key = {index}
        index = {index}
        text = {item.text} 
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
