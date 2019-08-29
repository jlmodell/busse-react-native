import * as React from "react";
import { DataTable } from "react-native-paper";
import { View, Text, Button, FlatList } from "react-native";
import axios from "axios";

const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDQwNTQ1ZmQ2Y2M5OTU4MDg5N2Y5MWYiLCJlbWFpbCI6Im1vZGVsbC5qZWZmQG1lLmNvbSIsIm1zZyI6InRva2VuIGV4cGlyZXMgaW4gNiBocnMiLCJjcmVhdGVkQXQiOiIyMDE5LTA4LTI4VDE4OjU4OjA1LjE5NVoiLCJleHBpcmVzQXQiOiIyMDE5LTA4LTI5VDAwOjU4OjA1LjE5NVoiLCJpYXQiOjE1NjcwMTg2ODUsImV4cCI6MTU2NzA0MDI4NX0.wCqV9-OaeNaizTnvNQxuk_c1cBtGuygNcANGMyHeyFI"
};

const fetchData = async () => {
  const res = await axios.get(
    `https://busse-nestjs-api.herokuapp.com/sales/distinct/cust/2019-01-01/2019-01-31`,
    { headers }
  );
  console.warn(res.data);
  return res.data;
};

const Test = () => {
  const [sales, setSales] = React.useState([]);

  React.useEffect(() => {
    setSales(fetchData());
  }, []);

  const _renderList = itemData => {
    <View>
      <Text>{itemData.item}</Text>
    </View>;
  };

  const _keyExtractor = item => item;

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Customers</DataTable.Title>
          <DataTable.Title>cid</DataTable.Title>
          <DataTable.Title numeric>Sales</DataTable.Title>
          <DataTable.Title numeric>Costs</DataTable.Title>
          <DataTable.Title numeric>GPM</DataTable.Title>
        </DataTable.Header>

        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={page => {
            console.warn(page);
          }}
          label="1-2 of 6"
        />
      </DataTable>

      <Button
        title="Test Fetch"
        onPress={() => setSales(prevState => ({ ...prevState }))}
      />

      <FlatList
        data={sales}
        keyExtractor={_keyExtractor}
        renderItem={_renderList()}
      />
    </View>
  );
};

export default Test;
