import * as Yup from "yup";

import values from "./schemaValues";

const { phone } = values;

const phoneSchema = Yup.object({
  phone,
});

export default phoneSchema;
