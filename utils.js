export const processCustomerName = (name) => {
  const firstName = name.split(" ").slice(0, -1).join(" ");
  const lastName = name.split(" ").pop();
  return {
    firstName,
    lastName,
  };
};
