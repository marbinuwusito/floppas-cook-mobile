import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firebaseApp from "../firebase/firebase";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import photos from "./photos";

const EditProfile = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [photoProfile, setPhotoProfile] = useState("");
  const [warning, setWarning] = useState("");
  const [loader, setLoader] = useState(false);

  const handleChange = (value) => {
    setUserName(value);
  };

  const getUser = async () => {
    const user = firebaseApp.auth().currentUser;
    const document = await firebaseApp
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get();
    setUserName(document.data().userName);
    setPhotoProfile(document.data().profilephoto);
    setLoader(true);
  };

  const updateUser = async () => {
    if (userName === "" || userName.length > 10) {
      setWarning(
        "Blank user name is not valid or is more longer than 10 characters!",
      );
      return;
    }
    navigation.popToTop();
    const user = firebaseApp.auth().currentUser;
    await firebaseApp.firestore().collection("users").doc(user.uid).set({
      userName: userName,
      profilephoto: photoProfile,
    }, { merge: true });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {loader
        ? <Image source={{ uri: photoProfile }} style={styles.img} />
        : (
          <View style={styles.loaderContainer}>
            <Feather name="loader" style={styles.loader}></Feather>
          </View>
        )}
      <View style={styles.info}>
        <Text style={styles.text}>Select a new avatar:</Text>
        <View style={styles.section2}>
          <ScrollView horizontal={true}>
            {photos.map((photo) => {
              return (
                <TouchableOpacity onPress={() => setPhotoProfile(photo.url)}>
                  <Image
                    source={{ uri: photo.url }}
                    style={styles.images}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        {warning !== "" &&
          (
            <View style={styles.warning}>
              <Text style={styles.warningText}>{warning}</Text>
              <TouchableOpacity
                onPress={() => {
                  setWarning("");
                }}
              >
                <AntDesign name="closecircleo" style={styles.closeBottom} />
              </TouchableOpacity>
            </View>
          )}
        <Text style={styles.text}>Set a new user name:</Text>
        <View style={styles.section}>
          <FontAwesome name="user-o" style={styles.icons} />
          <TextInput
            placeholderTextColor="#2e3a43"
            style={styles.input}
            onChangeText={(value) => handleChange(value)}
            value={userName}
          />
        </View>
      </View>
      <View style={{ width: 100, alignSelf: "center", marginBottom: 20 }}>
        <Button
          title="Update"
          onPress={() => updateUser()}
          color="#03aa84"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0c0f12",
    flex: 1,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
    margin: 10,
  },
  info: {
    alignSelf: "center",
    width: "100%",
    height: "auto",
    padding: 20,
    borderRadius: 3,
  },
  section: {
    justifyContent: "flex-start",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#2e3a43",
    marginBottom: 10,
    width: "95%",
  },
  section2: {
    flexDirection: "row",
    alignContent: "center",
    width: "100%",
    padding: 10,
  },
  icons: {
    fontSize: 20,
    color: "#03aa84",
    textAlign: "left",
    marginRight: 5,
  },
  text: {
    fontSize: 20,
    fontFamily: "ProductSansRegular",
    color: "#dfdfdf",
    marginLeft: 10,
  },
  icon: {
    color: "#03aa84",
    fontSize: 25,
    alignSelf: "center",
  },
  list: {
    color: "white",
    fontSize: 15,
    backgroundColor: "#12171b",
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    color: "#dfdfdf",
    fontFamily: "ProductSansRegular",
    fontSize: 15,
  },
  images: {
    width: 60,
    height: 60,
    borderRadius: 10,
    margin: 10,
  },
  warning: {
    backgroundColor: "#a7da1e",
    padding: 5,
    marginBottom: 20,
    margin: 5,
    width: "100%",
    alignSelf: "center",
    borderRadius: 5,
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeBottom: {
    fontSize: 20,
    marginRight: 5,
  },
  warningText: {
    textAlign: "center",
    color: "#0c0f12",
    fontFamily: "ProductSansRegular",
    fontSize: 15,
    width: "90%",
    alignSelf: "center",
  },
  loader: {
    textAlign: "center",
    alignSelf: "center",
    color: "#fdfdfd",
    fontSize: 50,
    alignSelf: 'center'
  },
  loaderContainer: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    alignSelf: 'center'
  }
});

export default EditProfile;
