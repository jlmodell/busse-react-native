import { createStackNavigator, createAppContainer } from "react-navigation";

import Login from "../screens/Login";
import Sales from "../screens/Sales";
import Test from "../screens/Test";

const MainNavigator = createStackNavigator({
  Test,
  Login,
  Sales
});

export default createAppContainer(MainNavigator);
