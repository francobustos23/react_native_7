// auth/LoginScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { UserContext } from '@/hooks/UserContext'; // Ajusta la ruta según corresponda

export default function LoginScreen() {
  const { setUsername } = useContext(UserContext);
  const [username, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (username.includes('@')) {
      setIsEmail(true);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsUsernameValid(emailRegex.test(username));
    } else {
      setIsEmail(false);
      setIsUsernameValid(username.length >= 5 && username.length <= 10);
    }
  }, [username]);

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{5,}$/;
    setIsPasswordValid(passwordRegex.test(password));
  }, [password]);

  const handleLogin = () => {
    if (isUsernameValid && isPasswordValid) {
      setUsername(username); // Actualizar el contexto con el nombre de usuario
      router.push('/auth/'); // Redirigir a la pantalla de inicio
    } else {
      console.log('Validation error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Username or Email"
        value={username}
        onChangeText={text => setLocalUsername(text)}
        style={styles.input}
        mode="outlined"
        error={!isUsernameValid && username !== ''}
      />
      <HelperText type="error" visible={!isUsernameValid && username !== ''}>
        {isEmail
          ? 'Ingresa un correo electrónico válido.'
          : 'El nombre de usuario debe tener entre 5 y 10 caracteres.'}
      </HelperText>
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        mode="outlined"
        secureTextEntry
        error={!isPasswordValid && password !== ''}
      />
      <HelperText type="error" visible={!isPasswordValid && password !== ''}>
        La contraseña debe tener al menos 5 caracteres, una mayúscula, una minúscula y un carácter especial.
      </HelperText>
      <Button mode="contained" onPress={handleLogin} disabled={!isUsernameValid || !isPasswordValid}>
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
});
