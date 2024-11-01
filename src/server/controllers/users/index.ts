import * as signIn from "./SignIn";
import * as signUp from "./SignUp"; 


export const UsersController = {
  ...signIn,
  ...signUp,
};