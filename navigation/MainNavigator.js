import { createStackNavigator, createAppContainer } from "react-navigation";

import Login from "../screens/Login";
import Sales from "../screens/Sales";

const MainNavigator = createStackNavigator({
  Login,
  Sales
});

export default createAppContainer(MainNavigator);
