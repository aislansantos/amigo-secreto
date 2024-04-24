import { getToday } from "@/utils/getToday";

export const validatePassword = (password: string): boolean => {
  // Como gerar uma senha não fixa, vamos usar a data atual
  const currentPassword = getToday().split("/").join("");
  return password === currentPassword;
};

export const createToken = () => {
  const currentPassword = getToday().split("/").join("");
  return `${process.env.DEFAULT_TOKEN}${currentPassword}`;
};

export const validateToken = (token: string) => {
  const currentToken = createToken();
  return token === currentToken;
};
