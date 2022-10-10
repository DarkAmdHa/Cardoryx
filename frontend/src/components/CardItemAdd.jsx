import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { addCard, reset } from '../features/cards/cardSlice'

import { useSelector, useDispatch } from 'react-redux'

import addedTick from '../assets/addedTick.png'

function CardItemAdd({ card, userExists }) {
  const { isError, isSuccess, message } = useSelector((state) => state.cards)

  const dispatch = useDispatch()
  const [isAdded, setIsAdded] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsAdded(userExists)
  }, [userExists])

  const addUserHandler = () => {
    setIsLoading(true)
    dispatch(
      addCard({
        name: card.name,
        companyName: card.companyName,
        email: card.email,
        telephoneNumber: card.telephoneNumber,
      })
    )

    setIsLoading(false)
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success('Carte Ajoutée.')
      setIsAdded(true)
    }
  }
  return (
    <div className="card">
      {card.companyName && (
        <div className="companyName">Compagnie: {card.companyName}</div>
      )}

      <div className="nameEmailContainer">
        <div className="name">Nom: {card.name}</div>
        {card.email && <div className="email">Email: {card.email}</div>}
      </div>
      {card.telephoneNumber && (
        <div className="telephoneNumber">
          Numero Tel: {card.telephoneNumber}
        </div>
      )}

      {!isAdded ? (
        <a
          className="btn btn-reverse btn-sm"
          onClick={(e) => {
            addUserHandler()
          }}
        >
          {!isLoading ? (
            'Ajouter'
          ) : (
            <div className="loadingSpinner button-loader"></div>
          )}
        </a>
      ) : (
        <a className="btn btn-sm addedUserBtn">
          <img src={addedTick} className="addedTick" />
          Ajouté
        </a>
      )}
    </div>
  )
}

export default CardItemAdd
