import React, { useContext, useEffect, useState } from 'react';
import { Stack, useNavigation } from 'expo-router';
import { Text, FAB } from 'react-native-paper'; 
import { UserContext } from '@/hooks/UserContext';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'; // Importa TouchableOpacity
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'; // Importa los iconos que necesitas

export default function HomeScreen() {
  const { username } = useContext(UserContext);
  const navigation = useNavigation();
  const [tareas, setTareas] = useState([]);

  const recuperarDatos = async () => {
    try {
      const jsonDatos = await AsyncStorage.getItem('tareas');
      const datos = jsonDatos != null ? JSON.parse(jsonDatos) : [];
      setTareas(datos.reverse()); // Aquí se da vuelta la lista antes de asignarla
      console.log('Datos recuperados:', datos);
    } catch (error) {
      console.error('Error al recuperar los datos: ', error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      recuperarDatos();
    });
    return unsubscribe;
  }, [navigation]);

  const renderTarea = ({ item }) => (
    <View style={styles.item}>
        <Text style={styles.title}>Titulo: {item.title}</Text>
        <Text style={styles.description}>Descripción: {item.description}</Text>
        <Text style={styles.autor}>Autor: {item.autor}</Text>
        <Text style={styles.iconButton}>{new Date(item.date).toLocaleDateString()}</Text>
        <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => editarTarea(item.id)} style={styles.iconButton}>
          <AntDesign name="edit" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eliminarTarea(item.id)} style={styles.iconButton}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
        </View>
    </View>
  );

  const editarTarea = async (id) => {
    try {
      const jsonDatos = await AsyncStorage.getItem('tareas');
      const tareas = jsonDatos != null ? JSON.parse(jsonDatos) : [];
      const tareaAEditar = tareas.find(tarea => tarea.id === id);
    
      if (tareaAEditar) {
        await AsyncStorage.setItem('tareaEditada', JSON.stringify(tareaAEditar));
        navigation.navigate('editarTarea', { id: tareaAEditar.id });
      } else {
        Alert.alert('Error', 'No se encontró la tarea a editar');
      }
    } catch (error) {
      console.error('Error al editar la tarea: ', error);
      Alert.alert('Error', 'Hubo un problema al editar la tarea');
    }
  }
  
  
  
  const eliminarTarea = async (id) => {
    try {
      const nuevasTareas = tareas.filter(tarea => tarea.id !== id);
      setTareas(nuevasTareas);
      
      await AsyncStorage.setItem('tareas', JSON.stringify(nuevasTareas));
      Alert.alert('Éxito', 'Tarea eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la tarea: ', error);
      Alert.alert('Error', 'Hubo un problema al eliminar la tarea');
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Stack.Screen options={{
          title: 'Tareas de ' + username,
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#525FE1' },
        }} />
        <Text style={styles.header}>Lista de Tareas</Text>
        <FlatList
          data={tareas}
          renderItem={renderTarea}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text>No hay tareas disponibles</Text>}
        />
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('ejemplo')}
        color='black'
        backgroundColor='#525FE1'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginVertical: 4,
  },
  autor: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  iconContainer: {
    flexDirection: 'row-reverse', 
    marginTop: 8, 
  },
  iconButton: {
    marginRight: 8, 
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
