import React from "react";
import { Stack } from 'expo-router';
import { Button, TextInput, View } from 'react-native';
import { Formik, Form, useField } from "formik";
import DatePicker from "react-datepicker";
import { saveAs } from 'file-saver';
import "react-datepicker/dist/react-datepicker.css";

const MyDatePicker = ({ name = "" }) => {
  const [field, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <DatePicker
      {...field}
      selected={value}
      onChange={(date) => setValue(date)}
    />
  );
};

export default function App() {
  const handleSubmit = (values) => {
    const jsonData = JSON.stringify(values, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, 'form-data.json');
    console.log('File saved', values);
  };

  return (
    <div className="App">
      <Stack.Screen options={{ title: 'Crear Tarea' }} />
      <h1>Crear Tarea</h1>
      <Formik
        initialValues={{ title: '', description: '', autor: '', date: new Date() }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <Form>
            <TextInput
              placeholder='Title'
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
            />
            <TextInput
              placeholder='Description'
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
            />
            <TextInput
              placeholder='Autor'
              onChangeText={handleChange('autor')}
              onBlur={handleBlur('autor')}
              value={values.autor}
            />
            <div className="form-group">
              <MyDatePicker name="date" />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
