import * as Yup from "yup";

import values from "./schemaValues";

const { email, password } = values;

const signInSchema = Yup.object({
  email,
  password,
});

export default signInSchema;
