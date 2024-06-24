import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.10.217.182:8080',
  timeout: 1000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, X-Requested-With',
  },
});

const fetch = async ({ url = '', body = {} }) => {
  const response = await api.post(url, body);
  return response.data;
};

export default fetch;
