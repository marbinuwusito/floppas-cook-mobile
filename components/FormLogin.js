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
import fb from "../firebase/firebase";

export const FormLogin = () => {
  const initialState = {
    email: "",
    userName: "",
    password: "",
  };

  const [hidden, setHidden] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async () => {
    if (userData.email === "" || userData.password === "") {
      setError(true);
      setErrorMessage("Fill the Email and Password field");
    } else {
      try {
        await fb.auth().signInWithEmailAndPassword(
          userData.email,
          userData.password,
        );
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
        <Text style={styles.textButton}>Login</Text>
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
    backgroundColor: "#007aae",
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
    backgroundColor: "#cf433e",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    padding: 10,
  },
  closeBottom: {
    color: "#dfdfdf",
    alignSelf: "flex-end",
    fontFamily: "ProductSansBold",
    fontSize: 20,
  },
});

export default FormLogin;
