import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function Prueba() {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty');

    const onChange = (event, selectedDate) => {
        if (Platform.OS !== 'web') {
            const currentDate = selectedDate || date;
            setShow(Platform.OS === 'ios');
            setDate(currentDate);
            updateText(currentDate);
        } else {
            const currentDate = event;
            setDate(currentDate);
            updateText(currentDate);
        }
    };

    const updateText = (currentDate) => {
        let tempDate = new Date(currentDate);
        let formattedDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let formattedTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
        setText(formattedDate + '\n' + formattedTime);
        console.log(formattedDate + ' (' + formattedTime + ')');
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    return (
        <View style={styles.container}>
            <Text style={{fontWeight:'bold', fontSize: 20}}>{text}</Text>
            <View style={{margin:20}}>
                <Button title="DatePicker" onPress={() => {showMode('date')}} />
            </View>
            <View style={{margin:20}}>
                <Button title="TimePicker" onPress={() => {showMode('time')}} />
            </View>
            {show && Platform.OS !== 'web' && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            {show && Platform.OS === 'web' && mode === 'date' && (
                <DatePicker
                    selected={date}
                    onChange={(date) => onChange(date)}
                    dateFormat="dd/MM/yyyy"
                />
            )}
            {show && Platform.OS === 'web' && mode === 'time' && (
                <DatePicker
                    selected={date}
                    onChange={(date) => onChange(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
