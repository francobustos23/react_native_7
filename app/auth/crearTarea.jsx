import React, { useEffect, useState } from "react";
import { Stack, useNavigation } from 'expo-router';
import { Button, View, Alert, StyleSheet } from 'react-native';
import { Formik, useField } from "formik";
import { TextInput, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {

  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const guardarDatos = async (values) => {
    try {
      const nuevaTarea = {
          id: new Date().getTime(), 
          title: values.title,
          description: values.description,
          autor: values.autor,
          date: selectedDate 
        };
      const jsonDatos = await AsyncStorage.getItem('tareas');
      const tareas = jsonDatos != null ? JSON.parse(jsonDatos) : [];
      tareas.push(nuevaTarea);
      await AsyncStorage.setItem('tareas', JSON.stringify(tareas));
      console.log('Datos guardados:', nuevaTarea);
      Alert.alert('Éxito', 'Tarea guardada correctamente');
      navigation.navigate('index');
    } catch (error) {
      console.error('Error al guardar los datos: ', error);
      Alert.alert('Error', 'Hubo un problema al guardar la tarea');
    }
  }

  // const [valueDateState, setValueDateState] = useState('');
  const valueDate = useEffect(() => {
    
    console.log('Fecha seleccionada:', selectedDate);

  }, [selectedDate])

  return (
    <View className="App">
      <Stack.Screen options={{
        title: 'Crear Tarea',
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#525FE1' },
       }} />
      <Text style={styles.textTitle}>Crear Tarea</Text>
      <Formik
        initialValues={{ title: '', description: '', autor: '' }}
        onSubmit={(values) => guardarDatos(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <View style={{padding:10}}>
            <TextInput style={styles.input}
              placeholder='Title'
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
            />
            <TextInput style={styles.input}
              placeholder='Description'
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
            />
            <TextInput style={styles.input}
              placeholder='Autor'
              onChangeText={handleChange('autor')}
              onBlur={handleBlur('autor')}
              value={values.autor}
            />
            </View>
            <View style={{ padding: 10 }}>{selectedDate  && (
              <Text style={styles.textBtn}>Fecha: {selectedDate.toLocaleDateString()}</Text>
            )}</View>

            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10}}>
              <Button
                title="Seleccionar Fecha"
                onPress={() => setShowDatePicker(true)}
                color={'purple'}
              />
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  setSelectedDate(date || selectedDate);
                  valueDate();
                }}
              />
            )}
            
            <View style={{padding:10, marginTop: 30, borderRadius: '10px'}}>
            <Button
              title="Guardar"
              onPress={handleSubmit}
              color={'purple'}
            />
            </View>
          </View>
        )}
      </Formik>
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
