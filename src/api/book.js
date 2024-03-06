import api from "../../axiosInstance";

export const fetchBooksApi = async (payload) => {
  let url = "/book";

  if (payload?.search) {
    url += `?search=${payload.search}`;
  }

  if (payload?.sort) {
    url += `${url.includes("?") ? "&" : "?"}sort=${payload.sort}`;
  }

  const response = await api.get(url);

  return response.data;
};

export const updateBookApi = async (payload) => {
  const response = await api.put(`/book/${payload.id}`, payload);

  return response.data;
};

export const createBookApi = async (payload) => {
  const response = await api.post("/book", payload);

  return response.data;
};
