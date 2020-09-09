import axios from "axios";

const url = "/api/persons";

const all = async () => {
  const response = await axios.get(url);
  return response.data;
};

const create = (person) => {
  return axios.post(url, person);
};

const update = (id, person) => {
  return axios.put(`${url}/${id}`, person);
};

const _delete = async (id) => {
  return axios.delete(`${url}/${id}`);
};

export default {
  all,
  create,
  update,
  delete: _delete,
};
