import React from 'react'
import { Text, View, StyleSheet, StatusBar } from 'react-native'
import Logo from '../components/Logo'
import FormLogin from '../components/FormLogin'

const Login = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0c0f12" />
            <View style={styles.header}>
                <Text style={styles.text}>Welcome Back To:</Text>
                <Logo />
            </View>
            <FormLogin navigation={navigation} />
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
    }
});

export default Login
