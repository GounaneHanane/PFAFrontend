import React, { useState, useRef, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Alert,
  Dimensions,
} from "react-native";
//Colors
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
import { Ionicons } from "@expo/vector-icons";
//Redux
import { useDispatch, useSelector } from "react-redux";
//Action
import { Login as LoginAction } from "../../../reducers";
//PropTypes check
import PropTypes from "prop-types";
import renderField from "./RenderField";
//Authentiation Touch ID Face ID
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { secretKey } from "../../../utils/Config";

const { height } = Dimensions.get("window");

//Validation
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "L'email ne peut pas être vide";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email invalide";
  }
  if (!values.password) {
    errors.password = "Le mot de passe ne peut pas être vide";
  } else if (values.password.length < 6) {
    errors.password = "Le mot de passe doit être supérieur ou égal à 6 caractères";
  }
  return errors;
};

const Login = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit } = props;
  const [showPass, setShowPass] = useState(false);
  const auth = useSelector((state) => state.auth);
  const unmounted = useRef(false);
  const scanFingerprintOrFaceId = async () => {
    const resData = await SecureStore.getItemAsync(secretKey);
    if (resData === null) {
      return alert("Vous devez activer la connexion par identification tactile / faciale");
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticating",
    });
    if (result.success) {
      const data = await JSON.parse(resData);
      dispatch(LoginAction(data.email, data.password));
    }
  };

  const showAndroidAlert = () => {
    Alert.alert(
      "Scan d'empreintes digitales",
      "Placez votre doigt sur le capteur tactile et appuyez sur scan.",
      [
        {
          text: "Scanner",
          onPress: () => {
            scanFingerprintOrFaceId();
          },
        },
        {
          text: "Annuler",
          onPress: () => console.log("Cancel"),
          style: "cancel",
        },
      ]
    );
  };
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const submit = async (values) => {
    try {
      await dispatch(LoginAction(values.email, values.password));
      props.navigation.navigate("Home");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "position" : "height"}
    >
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{ position: "absolute", top: 50, left: 20 }}
      >
        <Ionicons name="ios-arrow-back" size={35} color={Colors.light_green} />
      </TouchableOpacity>

      <View style={styles.header}>
      
      </View>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flexDirection: "column",
              marginHorizontal: 20,
              zIndex: -1,
              marginTop:50
            }}
          >
            <View>
              <Field
                name="email"
                keyboardType="email-address"
                label="Email"
                icon="email"
                component={renderField}
              />
              <Field
                name="password"
                keyboardType="default"
                label="Mot de passe"
                component={renderField}
                secureTextEntry={showPass ? false : true}
                passIcon="eye"
                icon="lock"
                showPass={showPass}
                setShowPass={setShowPass}
              />
            </View>
            <View style={styles.group}>
           
           <View style={styles.circleImage}>
             <TouchableOpacity
               onPress={
                 Platform.OS === "android"
                   ? showAndroidAlert
                   : scanFingerprintOrFaceId
               }
             >
               <CustomText style={styles.loginOpt}>
                Face Id?
           </CustomText>
             </TouchableOpacity>
             </View>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("ForgetPwScreen");
                }}
              >
                <CustomText
                  style={{
                    ...styles.textSignSmall,
                    fontFamily: "Roboto-Medium",
                  }}
                >
                  Mot de passe oublié ?
                </CustomText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={handleSubmit(submit)}
              style={{ marginVertical: 10, alignItems: "center" }}
            >
              <View style={styles.signIn}>
                {auth.isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <CustomText style={styles.textSign}>Connexion</CustomText>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
       
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  header: {
    marginTop: height * 0.2,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  title: {
    color: "black",
    fontSize: 30,
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
    textAlign: "center",
  },
  text: {
    color: "#fff",
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  textSign: {
    fontSize: 15,
    color: "#b74825",
    fontFamily: "Roboto-Medium",
    
    
  },
  textSignSmall: {
    color: Colors.lighter_green,
    textAlign: "center",
    fontSize:12,
    marginBottom:10
  },
  center: {
    alignItems: "center",
  },
  circleImage: {
    borderRadius: 55,
    borderStyle: "dashed",
    borderColor: "#fff",
  },
  faceid: {
    resizeMode: "contain",
    height: 70,
    width: 70,
  },
  loginOpt: {
    color: Colors.my_red,
    marginBottom: 9,
  },
});
export const LoginForm = reduxForm({
  form: "login", // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(Login);
