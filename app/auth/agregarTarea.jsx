import { View} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useState } from "react";
export default function AgregarTarea() {
    const [tarea, setTarea] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [autor, setAutor] = useState('');
    const [fecha, setFecha] = useState('');



    const handleAddTask = () => {
        console.log('Tarea:', tarea)
        console.log('Descripción:', descripcion)
    }

    return (
        <View>
            <Text>Agregar Tarea</Text>
            <TextInput
                label="Titulo"
                value={tarea}
                onChangeText={text => setTarea(text)}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label="Descripción"
                value={descripcion}
                onChangeText={text => setDescripcion(text)}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label="Autor"
                value={autor}
                onChangeText={text => setAutor(text)}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label="Fecha"
                value={fecha}
                onChangeText={text => setFecha(text)}
                style={styles.input}
                mode="outlined"
            />
            <Button
                mode="contained"
                onPress={handleAddTask}
            >
                Agregar Tarea
            </Button>
        </View>
    );
}

const styles = {
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
    },
};