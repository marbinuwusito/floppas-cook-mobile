import React from "react";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import firebaseApp from "../firebase/firebase";

const ProfilePhoto = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [photoProfile, setPhotoProfile] = useState("");

  const getUser = async () => {
    const user = firebaseApp.auth().currentUser;
    const document = await firebaseApp.firestore().collection("users").doc(
      user.uid,
    ).get();
    setUserName(document.data().userName);
    setPhotoProfile(document.data().profilephoto);
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{userName}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <Image
          source={{ uri: photoProfile }}
          style={styles.profilePhoto}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  text: {
    color: "#fdfdfd",
    fontFamily: "ProductSansRegular",
    width: "50%",
    textAlign: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 10,
  },
});

export default ProfilePhoto;
