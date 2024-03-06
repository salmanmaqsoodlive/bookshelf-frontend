import api from "../../axiosInstance";

export const fetchGenreApi = async () => {
  const response = await api.get("/genre");
  return response.data;
};
