import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, Text } from 'react-native-paper';
import { Stack } from 'expo-router';

export default function EditarTarea() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const [tarea, setTarea] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [autor, setAutor] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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
    <View style={{padding:10}}>
      <Stack.Screen options={{
        title: 'Editar Tarea',
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#525FE1' },
       }} />
      <Text style={styles.textTitle}>Editar Tarea</Text>
      <TextInput
        placeholder='Title'
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder='Description'
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder='Autor'
        style={styles.input}
        value={autor}
        onChangeText={setAutor}
      />
      <View style={{ padding: 10 }}>{selectedDate && (
        <Text style={styles.textBtn}>Fecha: {selectedDate.toLocaleDateString()}</Text>
      )}</View>

      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Button
          title="Seleccionar Fecha"
          onPress={() => setShowDatePicker(true)}
          color={'purple'}
        />
      </View>
      {
        showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) {
                setSelectedDate(date);
              }
            }}
          />
        )
      }
      <Button title="Guardar Cambios" onPress={guardarDatosEditados} color={'purple'} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
  },
  textTitle: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  textBtn: {
    fontSize: 18,
  }
});