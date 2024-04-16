function validationEmail(email: string): RegExpMatchArray | null {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return email.match(regex);
}

export const validateEmail = (email: string): string | undefined => {
  if (!validationEmail(email)) {
    return "User email is not valid";
  }
};
