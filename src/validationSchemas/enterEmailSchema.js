import * as Yup from "yup";

import values from "./schemaValues";

const { email } = values;

const enterEmailSchema = Yup.object({
  email,
  password: Yup.string().required().min(1, "min"),
});

export default enterEmailSchema;
