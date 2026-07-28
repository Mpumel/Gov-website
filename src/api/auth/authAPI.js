import api from "../axios";

export const registration = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);
