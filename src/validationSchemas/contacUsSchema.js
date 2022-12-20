import * as Yup from "yup";

import values from "./schemaValues";

const { email } = values;

const contactUsSchema = Yup.object({
  email,
});

export default contactUsSchema;
