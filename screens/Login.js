import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Text,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";

import { login } from "../store/actions";

import Input from "../components/Input";

const Login = props => {
  const [state, setState] = useState({
    email: "modell.jeff@me.com",
    password: "secret"
  });

  const handleChange = (name, value) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const HandleSubmit = async () => {
    let user = {
      email: state.email,
      password: state.password
    };

    await props.login(user);

    setState(prevState => ({
      ...prevState,
      password: null
    }));

    props.navigation.replace("Sales");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <View style={styles.loginContainer}>
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.label}>Email Address</Text>
            <Input
              name="email"
              style={styles.input}
              value={state.email}
              keyboardType="email-address"
              placeholder="you@abc.com"
              onChangeText={input => handleChange("email", input)}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.label}>Password</Text>
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
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = new StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loginContainer: {
    maxWidth: "80%",
    width: 300
  },
  label: {
    fontWeight: "700"
  },
  input: {
    paddingVertical: 10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10
  }
});

const mapStateToProps = state => {
  return { state };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
