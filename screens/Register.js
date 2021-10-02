import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FormRegister from '../components/FormRegister';
import Logo from '../components/Logo';

const Register = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor="#0c0f12" />
            <View style={styles.header}>
                <Text style={styles.text}>Welcome To:</Text>
                <Logo />
            </View>
            <FormRegister navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c0f12',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'ProductSansBold',
        fontSize: 25,
        color: '#fdfdfd',
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80
    }
});

export default Register
