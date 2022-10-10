import axios from 'axios'

const API_URL = '/cards/'

//Create New card
const addCard = async (cardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, cardData, config)
  return response.data
}

//Get user cards
const getCards = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

//Get user card
const getCard = async (cardId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + cardId, config)
  return response.data
}

const cardService = { addCard, getCards, getCard }

export default cardService
