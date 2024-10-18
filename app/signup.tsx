
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "@/components/TextInput";
import { userLogin, userRegister } from "@/apis/client/auth";
import { router } from "expo-router";
const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string(),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });
const signup = () => {
    const {
        usersignup,
        isPending,
        isSuccess,
        isError,
    
      }=userRegister()
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.header}>Signup Form</Text>
    
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                address: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                // console.log(values);
                const { name, email, password, address } = values;
                usersignup({ name, email, password, address });
              }}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <View>
                  <TextInput
                    placeholder="Name"
                    value={values.name}
                    onChangeText={handleChange("name")}
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
    
                  <TextInput
                    placeholder="Email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                  <TextInput
                    placeholder="Addres"
                    value={values.address}
                    onChangeText={handleChange("address")}
                  />
    
                  <TextInput
                    placeholder="Password"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    secureTextEntry={true}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
    
                  <TextInput
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    secureTextEntry={true}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                  )}
    
                  {/* Signup Button */}
                  {/* <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
                disabled={isPending} // Disable button while loading
              >
                {isPending ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>
                  <View style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 7,
                }}>
                    

                        <Text>Already have an account? </Text>
                        <TouchableOpacity onPress={()=>router.navigate('/login')}><Text style={{color:'blue'}}>Login</Text></TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </SafeAreaView>
      );
}

export default signup


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginTop: 50,
    },
    scrollContainer: {
      justifyContent: "center",
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
    button: {
      backgroundColor: "#007bff",
      padding: 12,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      textAlign: "center",
    },
    errorText: {
      color: "red",
      fontSize: 14,
      marginBottom: 10,
      marginLeft: 5,
    },
  });
  