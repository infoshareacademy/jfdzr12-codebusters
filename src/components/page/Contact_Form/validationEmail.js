function validationEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return email.match(regex);
}

export const validateEmail = (email) => {
  if (!validationEmail(email)) {
    return "User email is not valid";
  }
};
