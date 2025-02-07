import express from "express";
/*
 * Error Handling middleware separation of concerns and cleaner code (maybe not as much for smaller examples like this challenge)
 * */
import { ValidationError } from "./errors.js";
/*
 * Utilities file for helpful function, same goal as the middleware or
 * maybe move the functions themselves with the controllers where they are being used,
 * depends on project structure and style guides
 * */
import { processCustomerName } from "./utils.js";
/*
 * Validation Middleware
 * In this case used with simple field validation but could be implemented with Schema validation
 * libraries for bigger payloads.
 * Separated for cleaner code
 */
import { payloadValidation } from "./validations.js";
import { categoryMapping } from "./validations.js";

const app = express();

app.use(express.json());

const SERVER_PORT = 4000; // Could be configured in .env or based on project structure and style guides

//Simple logger, maybe not needed in this situation but nice to have
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

//Middleware route for executing validation, could be separated routes and controllers files for cleaner structure, depends on project structure and style guides
app.post("/", (req, res, next) => {
  const { name, category, customerName, customerEmail } = req.body || "";
  try {
    payloadValidation(name, category, customerName, customerEmail);
    next();
  } catch (err) {
    res.status(err.code || 404).json({ errorMsg: err.message });
  }
});

//Middleware for processing the payload body after it is being validated. same as above regarding separation of concerns and structure.
app.post("/", (req, res) => {
  const { name, category, customerName, customerEmail } = req.body || "";
  const { firstName, lastName } = processCustomerName(customerName);
  res.status(200).json({
    services: categoryMapping[category],
    customer: {
      name: firstName,
      lastName,
      email: customerEmail,
    },
    title: firstName + " " + lastName,
  });
});

//Catch all for the non-existent routes
app.use((req, res) => {
  res.status(404).json({ errorMsg: "Page not found" });
});

app.listen(SERVER_PORT);
