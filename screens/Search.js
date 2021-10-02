import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useEffect } from "react";

const TrendingRecipes = ({ recipes, navigation }) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Trending Recipes</Text>
        <Feather
          name="trending-up"
          style={{ color: "#03aa84", fontSize: 25, marginLeft: 10 }}
        />
      </View>
      <ScrollView horizontal={true}>
        {recipes.map((recipe) => {
          return (
            <View
              key={recipe.id}
              style={styles.trendingRecipes}
            >
              <Image source={{ uri: recipe.image }} style={styles.TRImage} />
              <Text style={styles.text}>{recipe.title}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Recipes", { id: recipe.id })}
                style={styles.buttonContainer}
              >
                <Text style={styles.buttonText}>Go to Recipe</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const Results = ({ recipes, navigation }) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Results:</Text>
        <Feather
          name="check-circle"
          style={{ color: "#03aa84", fontSize: 25, marginLeft: 10 }}
        />
      </View>
      <ScrollView horizontal={true}>
        {recipes.map((recipe) => {
          return (
            <View
              key={recipe.id}
              style={styles.trendingRecipes}
            >
              <Image source={{ uri: recipe.image }} style={styles.TRImage} />
              <Text style={styles.text}>{recipe.title}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Recipes", { id: recipe.id })}
                style={styles.buttonContainer}
              >
                <Text style={styles.buttonText}>Go to Recipe</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const Search = ({ navigation }) => {
  const [SearchRecipes, setSearchRecipes] = useState();
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const TrendingURL =
    `https://api.spoonacular.com/recipes/findByNutrients?minCarbs=10&maxCarbs=60&number=15&apiKey=fe730f254f2c4dae876e87a2cd27338d`;
  const [query, setQuery] = useState("");
  const [warning, setWarning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const Warning = ({ errorMessage }) => {
    return (
      <View style={styles.warningContainer}>
        <Text style={styles.warningText}>{errorMessage}</Text>
        <TouchableOpacity
          onPress={() => {
            setWarning(false), setErrorMessage("");
          }}
        >
          <AntDesign name="closecircleo" style={styles.closeBottom} />
        </TouchableOpacity>
      </View>
    );
  };

  const getRecipes = async () => {
    if (query === "") {
      setWarning(true);
      setErrorMessage("Please fill the search field");
    } else {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=fe730f254f2c4dae876e87a2cd27338d&number=15`,
      );
      const res = await data.json();

      if (res.totalResults === 0) {
        setWarning(true);
        setErrorMessage(
          `No results founds for ${query}, please try with another word`,
        );
      } else {
        setWarning(false);
        setSearchRecipes(res.results);
      }
    }
  };

  const getTrendingRecipes = async () => {
    const data = await fetch(TrendingURL);
    const res = await data.json();
    setTrendingRecipes(res);
  };

  const handleSubmit = (e) => {
    e.preventDefault;
    setQuery("");
    getRecipes();
  };

  useEffect(() => {
    getTrendingRecipes();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0c0f12" }}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="#0c0f12"
      />
      <View style={styles.section}>
        <Ionicons
          name="fast-food-outline"
          style={{ color: "#485764", fontSize: 20, padding: 5 }}
        />
        <TextInput
          placeholder="Search recipes"
          placeholderTextColor="#2e3a43"
          style={styles.input}
          onChangeText={(text) => setQuery(text)}
          onSubmitEditing={handleSubmit}
          value={query}
        />
        <Feather
          name="search"
          style={{ color: "#485764", fontSize: 20, padding: 5 }}
        />
      </View>

      {warning === true && <Warning errorMessage={errorMessage} />}
      {!SearchRecipes
        ? <AppLoading />
        : <Results recipes={SearchRecipes} navigation={navigation} />}
      {!trendingRecipes ? <Text>Loading</Text>
      : <TrendingRecipes recipes={trendingRecipes} navigation={navigation} />}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  section: {
    width: "90%",
    backgroundColor: "#12171b",
    alignSelf: "center",
    padding: 5,
    margin: 10,
    borderRadius: 7,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    fontFamily: "ProductSansRegular",
    fontSize: 15,
    color: "#fdfdfd",
  },
  title: {
    fontFamily: "ProductSansBold",
    fontSize: 30,
    color: "#dfdfdf",
  },
  titleContainer: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  text: {
    color: "#dfdfdf",
    fontFamily: "ProductSansRegular",
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    alignSelf: "center",
  },
  trendingRecipes: {
    padding: 25,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#12171b",
    width: 275,
  },
  TRImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    alignSelf: "center",
  },
  heartIcon: {
    fontSize: 25,
    color: "#03aa84",
    textAlign: "center",
  },
  buttonContainer: {
    width: "80%",
    backgroundColor: "#03aa84",
    alignSelf: "center",
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#dfdfdf",
    fontFamily: "ProductSansRegular",
    fontSize: 15,
    textAlign: "center",
  },
  warningContainer: {
    backgroundColor: "#a7da1e",
    padding: 5,
    margin: 5,
    width: "80%",
    alignSelf: "center",
    borderRadius: 5,
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  warningText: {
    textAlign: "center",
    color: "#0c0f12",
    fontFamily: "ProductSansRegular",
    fontSize: 15,
    width: "90%",
    alignSelf: "center",
  },
  closeBottom: {
    fontSize: 20,
    marginRight: 5,
  },
});

export default Search;
