import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";

import {
  fetchSalesData,
  fetchIndividualSalesByCustomer
} from "../store/actions";

import Input from "../components/Input";

const Sales = props => {
  const [state, setState] = useState({
    item: "696",
    distributor: "1300",
    distributors: [],
    newPrice: null,
    payment_terms: null,
    admin_fees: null,
    trace_fees: null,
    freight: null,
    commission: null,
    labor_costs: null,
    cash_discount: null,
    cost: null,
    sales: null,
    avgPrice: null,
    quantity: null,
    start: moment()
      .subtract(12, "months")
      .startOf("month")
      .format()
      .substring(0, 10),
    end: moment()
      .subtract(1, "months")
      .endOf("month")
      .format()
      .substring(0, 10)
  });

  const headers = {
    Authorization: `Bearer ${props.state.user._55.token}`
  };

  // useEffect(() => {
  //   console.warn(props.state.user._55.token);
  // }, []);

  // useEffect(() => {
  //   fetchDistributors();
  // }, []);

  // const fetchDistributors = async () => {
  //   const res = await axios.get(
  //     `https://busse-nestjs-api.herokuapp.com/distributor/`,
  //     {
  //       headers
  //     }
  //   );
  //   setState(prevState => ({
  //     ...prevState,
  //     distributors: res.data[0].distributor
  //   }));
  // };

  const dataFetch = async () => {
    const item = await axios.get(
      `https://busse-nestjs-api.herokuapp.com/item/${state.item}`,
      {
        headers
      }
    );
    const distributor = await axios.get(
      `https://busse-nestjs-api.herokuapp.com/distributor/${state.distributor}`,
      {
        headers
      }
    );
    const avgPrice = await axios.get(
      `https://busse-nestjs-api.herokuapp.com/sales/avg-price/${
        state.distributor
      }/${state.item}/${state.start}/${state.end}`,
      {
        headers
      }
    );

    // console.warn(item.data, distributor.data, avgPrice.data);

    setState(prevState => ({
      ...prevState,
      cost: item.data[0].cost,
      payment_terms: distributor.data[0].payment_terms,
      admin_fees: distributor.data[0].admin_fees,
      trace_fees: distributor.data[0].trace_fees,
      freight: distributor.data[0].freight,
      commission: distributor.data[0].commission,
      labor_costs: distributor.data[0].labor_costs,
      cash_discount: distributor.data[0].cash_discount,
      avgPrice: avgPrice.data[0].avgSalePrice,
      quantity: avgPrice.data[0].sales,
      sales: avgPrice.data[0].quantity
    }));
  };

  let displayData;

  if (state.cost) {
    displayData = (
      <View style={{ marginVertical: 20, width: 300, maxWidth: "80%" }}>
        <Text>{JSON.stringify(state)}</Text>
      </View>
    );
  } else {
    displayData = <Text />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <View style={styles.inputContainer}>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontWeight: "700" }}>Item</Text>
            <Input
              name="item"
              style={styles.input}
              placeholder="###"
              value={state.item}
              onChangeText={input =>
                setState(prevState => ({ ...prevState, item: input }))
              }
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontWeight: "700" }}>Distributor</Text>
            <Input
              name="distributor"
              style={styles.input}
              placeholder="###"
              value={state.distributor}
              onChangeText={input =>
                setState(prevState => ({ ...prevState, distributor: input }))
              }
            />
          </View>
        </View>
        <View>
          <Button title="Fetch Data" onPress={dataFetch} />
        </View>
        <View>{displayData}</View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = new StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%"
  },
  input: {
    paddingVertical: 10
  }
});

const mapStateToProps = state => {
  return { state };
};

export default connect(
  mapStateToProps,
  { fetchSalesData, fetchIndividualSalesByCustomer }
)(Sales);
