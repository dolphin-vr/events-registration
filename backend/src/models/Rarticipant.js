import Joi from "joi";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

export const RarticipantRegisterSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    "any.required": "missing required field {#label}",
    "string.pattern.base": "{#label} must be valid e-mail",
  }),
  fullName: Joi.string().required().messages({
    "any.required": "missing required field {#label}",
    "string.base": "{#label} must be string",
  }),
  dateOfBirth: Joi.date().iso().required().messages({
    "any.required": "missing required field {#label}",
    "string.base": "{#label} must be date",
  }),
  heardFrom: Joi.string().required().messages({
    "any.required": "missing required field {#label}",
    "string.base": "{#label} must be string",
  }),
});
