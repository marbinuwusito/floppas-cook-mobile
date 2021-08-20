import React from 'react'
import { Image, StyleSheet } from 'react-native'

const LogoHeader = () => {
    return (
        <Image source={require('../assets/img/LOGO-FLOPPAS-GREEN.png')} style={styles.logo} resizeMode="contain"/>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: '100%',
        marginLeft: 10
    }
});

export default LogoHeader
