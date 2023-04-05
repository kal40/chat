import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  ImageBackground,
  Alert,
} from "react-native";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

import SVGIcon from "../assets/icon.svg";

const backgroundImage = require("../assets/backgroundImage.png");

const COLOR_1 = "#090C08";
const COLOR_2 = "#474056";
const COLOR_3 = "#8A95A5";
const COLOR_4 = "#B9C6AE";
const BASE_FONT = "Poppins";

const Welcome = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(COLOR_1);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Chat", {
          uid: user.uid,
          name: name,
          backgroundColor: backgroundColor,
        });
      }
    });
  }, []);

  const signInUser = () => {
    if (name.length < 3) {
      Alert.alert("Please enter a name with at least 3 characters");
      return;
    }
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          uid: result.user.uid,
          name: name,
          backgroundColor: backgroundColor,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={[styles.container, styles.image]}
    >
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Welcome to Chat!</Text>
      </View>
      <View style={styles.formWrapper}>
        <View style={styles.inputSection}>
          <SVGIcon style={styles.icon} />
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
            textContentType="username"
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Choose Background Color:</Text>
          <View style={styles.colorsWrapper}>
            <Pressable
              onPress={() => setBackgroundColor(COLOR_1)}
              style={[
                styles.btn_colors__inactive,
                backgroundColor === COLOR_1 ? styles.btn_colors__active : null,
              ]}
            >
              <View style={[styles.btn_colors, styles.btn_colors__1]}></View>
            </Pressable>
            <Pressable
              onPress={() => setBackgroundColor(COLOR_2)}
              style={[
                styles.btn_colors__inactive,
                backgroundColor === COLOR_2 ? styles.btn_colors__active : null,
              ]}
            >
              <View style={[styles.btn_colors, styles.btn_colors__2]}></View>
            </Pressable>
            <Pressable
              onPress={() => setBackgroundColor(COLOR_3)}
              style={[
                styles.btn_colors__inactive,
                backgroundColor === COLOR_3 ? styles.btn_colors__active : null,
              ]}
            >
              <View style={[styles.btn_colors, styles.btn_colors__3]}></View>
            </Pressable>
            <Pressable
              onPress={() => setBackgroundColor(COLOR_4)}
              style={[
                styles.btn_colors__inactive,
                backgroundColor === COLOR_4 ? styles.btn_colors__active : null,
              ]}
            >
              <View style={[styles.btn_colors, styles.btn_colors__4]}></View>
            </Pressable>
          </View>
        </View>
        <Pressable onPress={signInUser} style={styles.btn}>
          <Text style={styles.btnText}>Start Chatting</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  myAppText: {
    fontFamily: BASE_FONT,
    fontSize: 16,
  },
  titleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "auto",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 100,
    marginBottom: 10,
  },
  formWrapper: {
    // flex: 1,
    justifyContent: "space-between",
    width: "88%",
    marginBottom: 30,
    // padding shorthand is not working, so longhand is used
    paddingLeft: "6%",
    paddingRight: "6%",
    paddingTop: "4%",
    paddingBottom: "4%",
    backgroundColor: "#fff",
  },
  colorsWrapper: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 60,
    marginBottom: 20,
  },
  inputSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#757083",
    height: 60,
    borderRadius: 5,
    marginBottom: 20,
  },
  icon: {
    padding: 12,
    margin: 15,
    height: 30,
    width: 30,
    resizeMode: "stretch",
    alignItems: "center",
  },
  image: {
    height: "100%",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "300",
    opacity: 50,
    color: "#757083",
  },
  btn: {
    width: "100%",
    backgroundColor: "#757083",
    borderRadius: 50,
    padding: 15,
    height: 50,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  btn_colors__inactive: {
    width: 55,
    height: 55,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  btn_colors__active: {
    borderColor: "#757083",
  },
  btn_colors: {
    width: 45,
    height: 45,
    padding: 10,
    borderRadius: 50,
  },
  btn_colors__1: {
    backgroundColor: COLOR_1,
  },
  btn_colors__2: {
    backgroundColor: COLOR_2,
  },
  btn_colors__3: {
    backgroundColor: COLOR_3,
  },
  btn_colors__4: {
    backgroundColor: COLOR_4,
  },
});

export default Welcome;
