import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../../utils/Colors";
import { Button } from "react-native-paper";
//PropTypes check
import PropTypes from "prop-types";

const UploadButton = ({
  uploadButton,
  setUploadButton,
  setImageUri,
  UploadProfile,
}) => {
  return (
    <View style={styles.button}>
      <Button
        icon='camera'
        mode='contained'
        onPress={UploadProfile}
        disabled={uploadButton}
        style={{
          height: 50,
          justifyContent: "center",
          backgroundColor: Colors.my_red,
          color:"#fff"
        }}
      >
       Mettre à jour l'image de profil
      </Button>
      {!uploadButton ? (
        <Button
          mode='contained'
          onPress={() => {
            setUploadButton(true), setImageUri("");
          }}
          disabled={uploadButton}
          style={{
            height: 50,
            marginTop: 10,
            justifyContent: "center",
            backgroundColor: Colors.my_red,
          }}
        >
          Cancel
        </Button>
      ) : (
        <></>
      )}
    </View>
  );
};

UploadButton.propTypes = {
  uploadButton: PropTypes.bool.isRequired,
  setUploadButton: PropTypes.func.isRequired,
  setImageUri: PropTypes.func.isRequired,
  UploadProfile: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    color:'#fff'
  },
});

export default UploadButton;
