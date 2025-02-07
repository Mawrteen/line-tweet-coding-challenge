import { ValidationError } from "./errors.js";
import { processCustomerName } from "./utils.js";

const validNameValues = ["service.service", "service.augen", "service.EyeTest"];

export const categoryMapping = {
  ac_AC: ["augen"],
  gl_GL: ["Beratung"],
  cl_AC: ["kontak", "augen"],
};

export const payloadValidation = (
  name,
  category,
  customerName,
  customerEmail,
) => {
  const { firstName, lastName } = processCustomerName(customerName);
  !name &&
    (() => {
      throw new ValidationError(`The field 'name' is required`, 400);
    })();
  !validNameValues.includes(name) &&
    (() => {
      throw new ValidationError(`Invalid value for the field 'name'`, 400);
    })();

  !category &&
    (() => {
      throw new ValidationError(`The field 'category' is required`, 400);
    })();

  !categoryMapping[category] &&
    (() => {
      throw new ValidationError(`Invalid value for the field 'category'`, 400);
    })();

  !customerName &&
    (() => {
      throw new ValidationError(`The field 'customerName' is required`, 400);
    })();

  (!firstName || !lastName) &&
    (() => {
      throw new ValidationError("Please provide first name and last name", 400);
    })();

  !customerEmail &&
    (() => {
      throw new ValidationError(`The field 'customerEmail' is required`, 400);
    })();

  !customerEmail.match("^[^@]+@[^@]+\\.[^@]+$") &&
    (() => {
      throw new ValidationError(`Please provide a valid email address`, 400);
    })();
};
