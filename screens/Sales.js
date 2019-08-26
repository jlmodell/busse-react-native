import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  DatePickerIOS,
  Keyboard
} from "react-native";
import { connect } from "react-redux";

import {
  fetchSalesData,
  fetchIndividualSalesByCustomer
} from "../store/actions";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Sales = props => {
  const [state, setState] = React.useState({
    start: new Date(),
    end: new Date()
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View styles={styles.screen}>
        <DatePickerIOS
          date={this.state.start}
          onDateChange={date =>
            setState(prevState => ({ ...prevState, start: date }))
          }
        />
        <DatePickerIOS
          date={this.state.end}
          onDateChange={date =>
            setState(prevState => ({ ...prevState, end: date }))
          }
        />
        <Button title="Fetch Data" onPress={() => {}} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = new StyleSheet.create({
  screen: {
    flex: 1,
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
