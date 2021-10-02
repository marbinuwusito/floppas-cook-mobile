import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Search from "./screens/Search";
import Profile from "./screens/Profile";
import Recipe from "./screens/Recipe";
import EditProfile from './screens/EditProfile';
import firebaseApp from "./firebase/firebase";
import "firebase/auth";
import LogoHeader from "./components/LogoHeader";
import ProfilePhoto from "./components/ProfilePhoto";

// 2659233e70232ad01467727b53cf9e78

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreAllLogs();

const StackMain = createStackNavigator();

export default function App() {
  const [value, setValue] = useState();

  const [fontsLoaded] = useFonts({
    "ProductSansRegular": require("./assets/fonts/Product-Sans-Regular.ttf"),
    "ProductSansBold": require("./assets/fonts/Product-Sans-Bold.ttf"),
  });

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setValue(true);
      } else {
        setValue(false);
      }
    });
  }, [value]);

  if (!fontsLoaded) return <AppLoading />;

  const registerOptions = {
    headerShown: false,
  };

  const loginOptions = {
    title: "",
    headerStyle: {
      backgroundColor: "#0c0f12",
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: "#fdfdfd",
  };

  const Main = () => {
    return (
      <StackMain.Navigator>
        {value === true
          ? (
            <>
              <StackMain.Screen
                name="Search"
                component={Search}
                options={({ navigation }) => ({
                  headerLeft: () => <LogoHeader />,
                  title: "",
                  headerStyle: {
                    backgroundColor: "#0c0f12",
                    elevation: 0,
                    shadowOpacity: 0,
                  },
                  headerRight: () => <ProfilePhoto navigation={navigation} />,
                })}
              />
              <StackMain.Screen
                name="Profile"
                component={Profile}
                options={() => ({
                  title: "Profile",
                  headerStyle: {
                    backgroundColor: "#0c0f12",
                    elevation: 0,
                    shadowOpacity: 0,
                  },
                  headerTitleStyle: {
                    fontFamily: "ProductSansBold",
                    padding: 5,
                    borderRadius: 2,
                    color: "#dfdfdf",
                  },
                  headerTintColor: "#fdfdfd",
                })}
              />
              <StackMain.Screen
                name="Recipes"
                component={Recipe}
                options={{
                  title: "",
                  headerTintColor: "#dfdfdf",
                  headerTransparent: true,
                }}
              />
              <StackMain.Screen
                name="Edit"
                component={EditProfile}
                options={{
                  title:"Edit Profile",
                  headerTintColor:"#dfdfdf",
                  headerStyle: {
                    backgroundColor: "#0c0f12",
                    elevation: 0,
                    shadowOpacity: 0,
                  },
                  headerTitleStyle: {
                    fontFamily: "ProductSansBold",
                    padding: 5,
                    borderRadius: 2,
                    color: "#dfdfdf",
                  },
                }}
              />
            </>
          )
          : (
            <>
              <StackMain.Screen
                name="Register"
                component={Register}
                options={registerOptions}
              />
              <StackMain.Screen
                name="Login"
                component={Login}
                options={loginOptions}
              />
            </>
          )}
      </StackMain.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}
