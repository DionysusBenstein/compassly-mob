import * as Yup from "yup";
import {
  fullName,
  noSpaces,
  limitWords,
  username,
  password,
  noEndlessSpaces,
  atLeastOneNumber,
} from "./regex";

const values = {
  fullName: Yup.string()
    .matches(fullName, "The full name should include only latin symbols")
    .matches(limitWords, "Your full name shoud consist of Name and Surname")
    .matches(
      noEndlessSpaces,
      "Only one space character is allowed between words"
    )
    .max(25, "Must be 25 characters or less")
    .min(6, "Full Name cannot be less than 6 characters")
    .required("Plese enter your full name"),
  userName: Yup.string()
    .min(6, "Username cannot be less than 6 letters")
    .matches(username, "Only latin symbols, numbers and '_' are allowed")
    .max(15, "Must be 15 characters or less")
    .required("Please enter your username"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter email"),
  password: Yup.string()
    // .matches(password, "The password should include latin letters and numbers")
    // .matches(noSpaces, "The password shouldn't inlcude spaces")
    .min(8, "min")
    .max(20, "Must be 20 characters or less")
    .matches(atLeastOneNumber, "At least one number")
    .required("Password Is Required"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords should match"),
  newEmail: Yup.string().email("Invalid email address"),
  phone: Yup.string().required().min(10, "Min"),
  acceptTerms: Yup.bool().oneOf([true], "You should accept Terms of service"),
};

export default values;
