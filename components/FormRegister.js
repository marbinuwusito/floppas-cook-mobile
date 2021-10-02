import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import firebaseApp from "../firebase/firebase";

export const FormRegister = ({ navigation }) => {
  const [hidden, setHidden] = useState(false);
  const initialState = {
    email: "",
    userName: "",
    password: "",
  };

  const profilephoto = {
    id: 3,
    url:
      "https://scontent.fsal3-1.fna.fbcdn.net/v/t1.6435-9/238069441_393359272135064_6990132240935304837_n.png?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=i3kYPeiyjJIAX_PAI3b&_nc_ht=scontent.fsal3-1.fna&oh=02f288564f28233d5457709361f1a5a9&oe=6166CD32",
  };

  const [userData, setUserData] = useState(initialState);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async () => {
    if (
      userData.email === "" || userData.userName === "" ||
      userData.password === ""
    ) {
      setError(true);
      setErrorMessage("Fill the Email, User name or Password field");
    } else {
      try {
        await firebaseApp.auth().createUserWithEmailAndPassword(
          userData.email,
          userData.password,
        );
        const user = firebaseApp.auth().currentUser;
        await firebaseApp.firestore().collection("users").doc(user.uid).set({
          userName: userData.userName,
          profilephoto: profilephoto,
          favorites: [],
        });
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      }
    }
  };

  const Error = ({ errorMessage }) => {
    return (
      <View style={styles.errorContainer}>
        <TouchableOpacity
          onPress={() => {
            setError(false), setErrorMessage("");
          }}
        >
          <AntDesign name="closecircleo" style={styles.closeBottom} />
        </TouchableOpacity>
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Email:</Text>
      <View style={styles.section}>
        <FontAwesome name="envelope-o" style={styles.icons} />
        <TextInput
          placeholder="example@gmail.com"
          placeholderTextColor="#2e3a43"
          style={styles.input}
          autoCompleteType="off"
          onChangeText={(value) => handleChange("email", value)}
          value={userData.email}
        />
      </View>

      <Text style={styles.text}>User Name:</Text>
      <View style={styles.section}>
        <FontAwesome name="user-o" style={styles.icons} />
        <TextInput
          placeholder="Your User Name"
          placeholderTextColor="#2e3a43"
          style={styles.input}
          onChangeText={(value) => handleChange("userName", value)}
          value={userData.userName}
        />
      </View>

      <Text style={styles.text}>Password:</Text>
      <View style={styles.section}>
        <FontAwesome5 name="key" style={styles.icons} />
        <TextInput
          placeholder="Your Password"
          placeholderTextColor="#2e3a43"
          style={styles.input}
          secureTextEntry={hidden ? false : true}
          onChangeText={(value) => handleChange("password", value)}
          value={userData.password}
        />
        <TouchableOpacity onPress={() => setHidden(!hidden)}>
          <FontAwesome5
            name={hidden ? "eye-slash" : "eye"}
            style={styles.icons}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.buttonSubmit}
        onPress={() => handleSubmit()}
      >
        <Text style={styles.textButton}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.button}>
          Already{" "}
          <Text
            style={{
              ...styles.button,
              color: "#007aae",
              fontFamily: "ProductSansBold",
            }}
          >
            have an accout?
          </Text>
        </Text>
      </TouchableOpacity>
      {error ? <Error errorMessage={errorMessage} /> : <View />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    margin: 30,
  },
  input: {
    width: "80%",
    padding: 10,
    color: "#dfdfdf",
    fontFamily: "ProductSansRegular",
  },
  section: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#2e3a43",
    marginBottom: 10,
  },
  icons: {
    color: "#03aa84",
    fontSize: 20,
  },
  text: {
    paddingTop: 5,
    color: "#fdfdfd",
    fontFamily: "ProductSansRegular",
  },
  button: {
    color: "#fdfdfd",
    fontFamily: "ProductSansBold",
    fontSize: 15,
    textAlign: "center",
    padding: 5,
  },
  textButton: {
    color: "#fdfdfd",
    fontFamily: "ProductSansRegular",
    fontSize: 15,
    textAlign: "center",
  },
  buttonSubmit: {
    width: "30%",
    alignSelf: "center",
    padding: 10,
    margin: 10,
    borderRadius: 6,
    backgroundColor: "#03aa84",
  },
  error: {
    fontFamily: "ProductSansBold",
    fontSize: 15,
    textAlign: "center",
    color: "#dfdfdf",
    width: "80%",
  },
  errorContainer: {
    borderRadius: 7,
    margin: 1,
    padding: 5,
    backgroundColor: "#cf433e",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  closeBottom: {
    color: "#dfdfdf",
    alignSelf: "flex-end",
    fontFamily: "ProductSansBold",
    fontSize: 20,
    marginLeft: 5,
  },
});

export default FormRegister;
