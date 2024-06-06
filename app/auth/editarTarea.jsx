import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarTarea() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  
  const [tarea, setTarea] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [autor, setAutor] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const obtenerTarea = async () => {
      try {
        const jsonDatos = await AsyncStorage.getItem('tareas');
        const tareas = jsonDatos != null ? JSON.parse(jsonDatos) : [];
        const tareaAEditar = tareas.find(tarea => tarea.id === id);
        if (tareaAEditar) {
          setTarea(tareaAEditar);
          setTitle(tareaAEditar.title);
          setDescription(tareaAEditar.description);
          setAutor(tareaAEditar.autor);
          setSelectedDate(new Date(tareaAEditar.date));
        }
      } catch (error) {
        console.error('Error al obtener la tarea: ', error);
        Alert.alert('Error', 'Hubo un problema al obtener la tarea');
      }
    };
    obtenerTarea();
  }, [id]);

  const guardarDatosEditados = async () => {
    try {
      const jsonDatos = await AsyncStorage.getItem('tareas');
      const tareas = jsonDatos != null ? JSON.parse(jsonDatos) : [];
      const tareaEditada = {
        id: id, // Asegúrate de incluir el ID de la tarea que se está editando
        title: title,
        description: description,
        autor: autor,
        date: selectedDate
      };

      const nuevasTareas = tareas.map(tarea => tarea.id === tareaEditada.id ? tareaEditada : tarea);
      await AsyncStorage.setItem('tareas', JSON.stringify(nuevasTareas));
      Alert.alert('Éxito', 'Tarea editada correctamente');
      navigation.navigate('index', { actualizar: true });
    } catch (error) {
      console.error('Error al guardar los datos editados: ', error);
      Alert.alert('Error', 'Hubo un problema al guardar la tarea editada');
    }
  }

  if (!tarea) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Autor</Text>
      <TextInput
        style={styles.input}
        value={autor}
        onChangeText={setAutor}
      />
      {/* Aquí puedes añadir un selector de fecha para `selectedDate` */}
      <Button title="Guardar Cambios" onPress={guardarDatosEditados} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 8,
  },
});
