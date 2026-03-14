import { api } from "../api/axios";

export const login = async (email: string, password: string) => {
  const res = await api.post("/users/login", {
    email,
    password,
  });

  return res.data;
};

export const register = async (email: string, password: string) => {
  const res = await api.post("/users", {
    email,
    password,
  });

  return res.data;
};
