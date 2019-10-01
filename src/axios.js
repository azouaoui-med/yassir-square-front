import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.43.208:3650/api/v1/public/b2c/client',
  headers: { authorisation: localStorage.getItem('token') },
});
