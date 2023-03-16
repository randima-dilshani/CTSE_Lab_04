import {View, StyleSheet, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import {firebase} from "../../firebase/firebase.config";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";


export default function Login() {
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage , setErrorMessage] = useState("");

    const navigation = useNavigation();
    const auth = firebase.auth();

    const handleSignUp = async ()=>{
        if(email === "" || password === "") {
            setErrorMessage("Please fill all fields");
            return;
        }
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            const user = userCredential.user;
            Alert.alert("Success", "User created Successfully !!",[
                {
                text: "OK", 
                onPress: () => {
                    navigation.push("Login");
                  },
                },
            ]);
        })
        .catch ((error)=>{
            const statusCode = error.code;

            if (statusCode === "auth/user-not-found") {
              setErrorMessage("User not found");
              return;
            } else if (statusCode === "auth/wrong-password") {
              setErrorMessage("Wrong password");
              return;
            } else if (statusCode === "auth/invalid-email") {
              setErrorMessage("Invalid email");
              return;
            } else if (statusCode === "auth/email-already-in-use") {
              setErrorMessage("Email already in use");
              return;
            } else if (statusCode === "auth/weak-password") {
              setErrorMessage("Password must be at least 6 characters");
              return;
            } else {
              setErrorMessage("Something went wrong");
              return;
            }
          });
    }

  const handleLogin = () => {
    if (email === "" || password === "") {
      setErrorMessage("Please fill all the fields");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail("");
        setPassword("");
        navigation.push("Todo");
      })
      .catch((error) => {
        const statusCode = error.code;

        if (statusCode === "auth/user-not-found") {
          setErrorMessage("User not found");
          return;
        } else if (statusCode === "auth/wrong-password") {
          setErrorMessage("Wrong password");
          return;
        } else if (statusCode === "auth/invalid-email") {
          setErrorMessage("Invalid email");
          return;
        } else {
          setErrorMessage("Something went wrong");
          return;
        }
      });
  };
return (
    <View style={styles.container}>
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter Your Email"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter Your Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      {errorMessage !== "" && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.registerButton}
        >
          <Text style={styles.registerButtonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      backgroundColor:"#E57CFA",
      alignItems: "center",
      justifyContent: "center",
      padding: "4%",
    },
  
    textInputContainer: {
      flex: 2,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  
    textInput: {
      width: "80%",
      height: 50,
      borderWidth:1,
      borderRadius: 10,
      paddingLeft: 10,
      marginBottom: "5%",
    },
  
    buttonContainer: {
      width: "50%",
      height: "20%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  
    loginButton: {
      width: "55%",
      height: "20%",
      backgroundColor: "#F5F96B",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "white",
      minHeight: 50,
      marginLeft:-20,
      marginRight:20
    },
  
    loginButtonText: {
      color: "white",
      fontWeight: "bold",
    },
  
    registerButton: {
      width: "55%",
      height: "20%",
      backgroundColor: "white",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#F98B88",
      minHeight: 50,
      marginLeft:0
    },
  
    registerButtonText: {
      fontWeight: "bold",
      color: "black",
    },
  
    errorContainer: {
      width: "80%",
      height: 50,
      backgroundColor: "red",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
  
    errorText: {
      color: "white",
      fontWeight: "bold",
    },
  });
  