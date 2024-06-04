// home/HomeScreen.js
import React, { useContext } from 'react';
import { Stack, useNavigation } from 'expo-router';
import { Text } from 'react-native-paper';
import { UserContext } from '@/hooks/UserContext'; // Ajusta la ruta según corresponda
import { View } from 'react-native-web';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

export default function HomeScreen() {
  const { username } = useContext(UserContext);
  const navigation = useNavigation();
  return (
      <>
      <Stack.Screen options={{
        title: 'Tareas de ' + username,
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#525FE1' },
      }} />
      <Text>Lista de Tareass</Text>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('prueba')}
      />
      </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
