import React, { useState, useEffect } from 'react'
import { Button, StyleSheet, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import fb from '../firebase/firebase'
import { Feather, MaterialIcons } from '@expo/vector-icons'

const Profile = ({ navigation }) => {

    const { currentUser } = fb.auth();

    const logOut = () => {
        fb.auth().signOut();
    }

    const [userName, setUserName] = useState('')
    const [photoProfile, setPhotoProfile] = useState('')
    const [favorites, setFavorites] = useState([])

    const getUser = async () => {
        const user = fb.auth().currentUser;
        const document = await fb.firestore().collection('users').doc(user.uid).get();
        setUserName(document.data().userName);
        setPhotoProfile(document.data().profilephoto);
        setFavorites(document.data().favorites);
    }

    const RenderFavorites = ({ item, navigation }) => {
        return <TouchableOpacity
            style={{ flexDirection: 'row', marginLeft: 30, }}
            onPress={() => navigation.navigate('Recipes', { id: item.id })}
        >
            <MaterialIcons name="arrow-right" style={styles.icon} />
            <Text style={styles.list}>{item.name}</Text>
        </TouchableOpacity>
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: photoProfile.url }}
                style={styles.img}
            />
            <View style={styles.info}>
                <View style={styles.section}>
                    <Feather name="user" style={styles.icons} />
                    <Text style={{ ...styles.text, color: '#03aa84', marginLeft: 0 }}>Name:</Text>
                    <Text style={styles.text}>{userName}</Text>
                </View>
                <View style={styles.section}>
                    <Feather name="mail" style={styles.icons} />
                    <Text style={{ ...styles.text, color: '#03aa84', marginLeft: 0 }}>Email:</Text>
                    <Text style={styles.text}>{currentUser.email}</Text>
                </View>
                <View style={styles.section2}>
                    <View style={styles.section}>
                        <Feather name="star" style={styles.icons} />
                        <Text style={{ ...styles.text, color: '#03aa84', marginLeft: 0 }}>Favorites:</Text>
                    </View>
                    {
                        favorites.map((favorite) => {
                            return <RenderFavorites item={favorite} navigation={navigation} key={favorite.id} />
                        })
                    }
                </View>

            </View>
            <View style={{ width: 100, alignSelf: 'center', margin: 20 }}>
                <Button title="Log Out" onPress={() => logOut()} color="#03aa84" />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0c0f12',
        flex: 1
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf: 'center',
        margin: 20
    },
    info: {
        alignSelf: 'center',
        width: '90%',
        height: 'auto',
        padding: 20,
        borderRadius: 3
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        margin: 5,
        width: '100%',
    },
    section2: {
        flexDirection: 'column',
        alignContent: 'center',
        width: '100%',
    },
    icons: {
        fontSize: 20,
        color: '#03aa84',
        textAlign: 'left',
        marginRight: 5
    },
    text: {
        fontSize: 15,
        fontFamily: 'ProductSansRegular',
        color: '#dfdfdf',
        marginLeft: 10,
    },
    icon: {
        color: '#03aa84',
        fontSize: 25,
        alignSelf: 'center'
    },
    list: {
        color: 'white',
        fontSize: 15,
        backgroundColor: '#12171b',
        padding: 5,
        margin: 5,
        borderRadius: 5
    }
});

export default Profile
