import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3650/api/v1/public/b2c/client',
  headers: { authorisation: localStorage.getItem('token') },
});
