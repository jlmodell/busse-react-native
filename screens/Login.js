import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, TextInput, Text, StyleSheet, View } from "react-native";

import { login } from "../store/actions";

import Input from "../components/Input";

const Login = props => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleChange = (name, value) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  let user = {};

  const HandleSubmit = () => {
    user = {
      email: state.email,
      password: state.password
    };

    props.login(user);

    setState(prevState => ({
      ...prevState,
      password: null
    }));
  };

  return (
    <View style={styles.loginContainer}>
      <View>
        <Text>Email Address</Text>
        <Input
          name="email"
          style={styles.input}
          value={state.email}
          keyboardType="email-address"
          placeholder="you@abc.com"
          onChangeText={input => handleChange("email", input)}
        />
      </View>
      <View>
        <Text>Password</Text>
        <Input
          name="password"
          secureTextEntry
          style={styles.input}
          value={state.password}
          placeholder="password"
          onChangeText={input => handleChange("password", input)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={HandleSubmit} />
        <Button title="Register" color="red" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  loginContainer: {
    width: "80%"
  },
  input: {
    paddingVertical: 10
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});

const mapStateToProps = state => {
  return { state };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
