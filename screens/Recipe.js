import React, { useState, useEffect } from 'react'
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Feather, AntDesign, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import fb from '../firebase/firebase';
import * as firebase from 'firebase'

const Recipe = ({ route }) => {

    const [recipe, setRecipe] = useState({});
    const [ingredients, setIngredients] = useState([])
    const [instructions, setInstructions] = useState([])
    const [liked, setLiked] = useState()
    const [likedRecipe, setLikedRecipe] = useState({})
    const [loader, setLoader] = useState(false)

    const setFavorite = async (id, name) => {
        const currentUser = fb.auth().currentUser;
        if (liked) {
            setLiked(false);
            await fb.firestore().collection('users').doc(currentUser.uid).update({
                favorites: firebase.default.firestore.FieldValue.arrayRemove({
                    name: name,
                    id: id
                })
            }, { merge: true })
        } else {
            setLiked(true);
            await fb.firestore().collection('users').doc(currentUser.uid).update({
                favorites: firebase.default.firestore.FieldValue.arrayUnion({
                    name: name,
                    id: id
                })
            }, { merge: true })
        }

    }

    const getUser = async () => {
        const user = fb.auth().currentUser;
        const document = await fb.firestore().collection('users').doc(user.uid).get();
        setLikedRecipe(document.data().favorites.find((favorite) => favorite.id === route.params.id));
        if (likedRecipe) {
            setLiked(true);
            setLoader(true);
        } else {
            setLiked(false);
        }
    }

    const getRecipe = async () => {
        const idFood = route.params.id;
        const complexURL = `https://api.spoonacular.com/recipes/${idFood}/information?apiKey=1d14595b8eda4553a2744f310f6d4b91`;
        const data = await fetch(complexURL);
        const res = await data.json();
        setRecipe(res);
        setIngredients(res.extendedIngredients)
        setInstructions(res.analyzedInstructions[0].steps)
    }

    useEffect(() => {
        getUser();
        getRecipe();
    }, [liked]);

    const RenderIngredients = ({ item }) => {
        return <View style={{ flexDirection: 'row', marginLeft: 30 }}>
            <MaterialIcons name="arrow-right" style={styles.icon} />
            <Text style={styles.list}>{item.name} ({item.amount.toFixed(1)} {item.unit})</Text>
        </View>
    }

    const RenderSteps = ({ item }) => {
        return <View style={{ flexDirection: 'row', marginLeft: 30 }}>
            <MaterialIcons name="arrow-right" style={styles.icon} />
            <Text style={styles.list}>{item.number}: {item.step}</Text>
        </View>
    }

    return (
        <View style={{ backgroundColor: '#0c0f12', flex: 1 }}>
            <StatusBar translucent={true} style="light" />
            {
                recipe !== {} && <>
                    <View style={{ height: '50%' }}>
                        <ImageBackground style={styles.image} source={{ uri: recipe.image }}>
                            <View style={styles.child}>
                                <Text style={styles.title}>{recipe.title}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <ScrollView style={styles.info}>
                        <View style={styles.section}>
                            <MaterialCommunityIcons name="bowl-mix-outline" style={styles.icon} />
                            <Text style={styles.text}>Name:</Text>
                            <Text style={{ ...styles.text, color: '#dfdfdf' }}>{recipe.title}</Text>
                        </View>
                        <View style={styles.section}>
                            <FontAwesome5 name="list" style={styles.icon} />
                            <Text style={styles.text}>Ingredients:</Text>

                        </View>
                        {
                            ingredients !== [] && (
                                ingredients.map((ingredient, id) => {
                                    return <RenderIngredients key={id} item={ingredient} />
                                })
                            )
                        }
                        <View style={styles.section}>
                            <Feather name="check-square" style={styles.icon} />
                            <Text style={styles.text}>Instructions:</Text>
                        </View>
                        {
                            instructions !== [] && instructions.map((step) => {
                                return <RenderSteps item={step} key={step.number} />
                            })
                        }
                        {
                            loader === false ? (
                                <TouchableOpacity style={styles.buttonContainer}>
                                    <Feather name="loader" style={styles.buttonText} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => setFavorite(route.params.id, recipe.title)} style={styles.buttonContainer}>
                                    <AntDesign name={likedRecipe ? 'heart' : 'hearto'} style={styles.buttonText} />
                                </TouchableOpacity>
                            )
                        }
                    </ScrollView>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        tintColor: 'cyan',
    },
    child: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.60)',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'ProductSansRegular',
        fontSize: 35,
        alignSelf: 'center',
        justifyContent: 'center',
        color: '#dfdfdf',
        margin: 40,
        textAlign: 'center'
    },
    info: {
        width: '90%',
        alignSelf: 'center',
        margin: 20,
        borderRadius: 12
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    text: {
        color: '#03aa84',
        fontFamily: 'ProductSansRegular',
        fontSize: 15,
        marginRight: 5
    },
    icon: {
        color: '#03aa84',
        fontSize: 20,
        marginRight: 3,
        alignSelf: 'center'
    },
    list: {
        color: 'white',
        fontSize: 15,
        width: '80%',
        borderRadius: 5,
        padding: 5,
        margin: 5,
        backgroundColor: '#12171b',
    },
    buttonContainer: {
        width: '20%',
        backgroundColor: '#03aa84',
        alignSelf: 'center',
        padding: 5,
        margin: 10,
        borderRadius: 5
    },
    buttonText: {
        color: '#dfdfdf',
        fontFamily: 'ProductSansRegular',
        fontSize: 25,
        textAlign: 'center',
        alignSelf: 'center'
    }
});

export default Recipe
