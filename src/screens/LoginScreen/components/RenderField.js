import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
//Colors
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default renderField = ({
  label,
  keyboardType,
  secureTextEntry,
  icon,
  showPass,
  passIcon,
  setShowPass,
  meta: { touched, error, warning },
  input: { onChange, ...restInput },
}) => {
  return (
    <View style={{marginBottom:10}}>
      <View>
        <TextInput
          placeholder={label}
          autoCapitalize='none'
          mode='outlined'
          clearButtonMode={passIcon ? "never" : "always"}
          selectionColor={Colors.leave_green}
          theme={{ colors: { primary: Colors.leave_green } }}
          left={
            <TextInput.Icon
              name={icon}
              size={24}
              color={'#b74825'}
              style={{ paddingRight: 10, justifyContent: 'center',
              alignContent: 'center',
              justifyContent:'center' }}
            />
          }
          underlineColorAndroid ='transparent'
          style={{
            fontSize: 14,
            fontWeight: "bold",
           backgroundColor: "transparent" ,
           borderBottom:1, 
           height: 40,
           borderRadius: 15,
            
            // paddingHorizontal: 5,
          }}
          keyboardType={keyboardType}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry}
          {...restInput}
        />
        {passIcon ? (
          <MaterialCommunityIcons
            name={showPass ? "eye" : "eye-off"}
            size={24}
            color={Colors.lighter_green}
            onPress={() => {
              setShowPass((prev) => !prev);
            }}
            style={{
              position: "absolute",
              top: "40%",
              right: 10,
              zIndex: 100,
            }}
          />
        ) : (
          <></>
        )}
      </View>
      {touched && error && (
        <CustomText
          style={{ color: "red", marginHorizontal: 15, marginTop: 5 }}
        >
          {error}
        </CustomText>
      )}
    </View>
  );
};
