import api from "../../axiosInstance";

export const signup = async (payload) => {
  const response = await api.post("/user", payload);

  return response.data;
};

export const signin = async (payload) => {
  const response = await api.post("/user/signin", payload);
  return response.data;
};

export const deleteUserApi = async () => {
  const response = await api.delete("/user");
  return response.data;
};
