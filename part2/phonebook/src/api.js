import axios from "axios";

const url = "http://localhost:3001/persons";

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

export default {
  all,
  create,
  update,
};
