import * as Yup from "yup";
import values from "./schemaValues";

const { fullName, userName, email, password, confirmPassword } = values;

const signUpSchema = Yup.object({
  fullName,
  userName,
  email,
  password,
  confirmPassword,
});

export default signUpSchema;
