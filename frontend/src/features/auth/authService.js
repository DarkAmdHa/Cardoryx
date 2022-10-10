import axios from 'axios'

const API_URL = '/users/'

//Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  }
}

//Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  }
}

//Logout User
const logout = () => {
  localStorage.removeItem('user')
}

const getUsers = async (user) => {
  const response = await axios.post(API_URL + 'usersList', user)
  if (response.data) {
    console.log(response.data)
    return response.data
  }
}

const authService = {
  register,
  logout,
  login,
  getUsers,
}

export default authService
