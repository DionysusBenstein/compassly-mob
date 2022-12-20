import * as Yup from "yup";

import values from "./schemaValues";

const { password, confirmPassword, acceptTerms } = values;

const resetPasswordSchema = Yup.object({
  password,
  confirmPassword,
  acceptTerms,
});

export default resetPasswordSchema;
