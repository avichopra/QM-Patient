import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Login from "./Login/login";
import SignUp from "./Signup/signup";
import Reset from "./reset/reset";
const SwitchRouteConfig = {
  Login: Login,
  SignUp: SignUp,
  Reset: Reset
};

const SwitchConfig = {
  initialRouteName: "Login"
};

export default createAppContainer(
  createSwitchNavigator(SwitchRouteConfig, SwitchConfig)
);
