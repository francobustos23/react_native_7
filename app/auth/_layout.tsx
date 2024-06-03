import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="registro" options={{ title: 'Registrarse' }} />
    </Stack>
  );
}
