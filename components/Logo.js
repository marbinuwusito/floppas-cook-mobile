import React from 'react'
import { Image, StyleSheet } from 'react-native'

const Logo = () => {
    return (
        <Image
            source={require('../assets/img/LOGO-FLOPPAS-GREEN.png')}
            style={styles.logo}
            resizeMode='contain'
        />
    )
}

const styles = StyleSheet.create({
    logo: {
        height: 50,
    }
});

export default Logo
