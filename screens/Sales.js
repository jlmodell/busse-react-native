import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";

import {
  fetchSalesData,
  fetchIndividualSalesByCustomer
} from "../store/actions";

const Sales = props => {
  return (
    <View style={styles.screen}>
      <Text>Hello World</Text>
      <Button title="Push Me" onPress={() => console.warn(props.sales)} />
    </View>
  );
};

const styles = new StyleSheet.create({
  screen: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return { state };
};

export default connect(
  mapStateToProps,
  { fetchSalesData, fetchIndividualSalesByCustomer }
)(Sales);
