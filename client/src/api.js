// src/api.js
import axios from "axios";

export const signup = (username, password) => {
  return axios.post('/api/signup', { username, password })
    .then(response => response.data)
}

export const login = (username, password) => {
  return axios.post('/api/login', { username, password })
    .then(response => response.data)
}

export const logout = () => {
  return axios.post('/api/logout', {})
    .then(response => response.data)
}