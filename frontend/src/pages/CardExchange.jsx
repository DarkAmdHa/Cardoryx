import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../features/auth/authSlice'
import { getCards } from '../features/cards/cardSlice'

import BackButton from '../components/BackButton'
import CardItemAdd from '../components/CardItemAdd'
import Spinner from '../components/Spinner'

function CardExchange() {
  const { isLoading, isError, message, users } = useSelector(
    (state) => state.auth
  )

  const { cards, isLoadingCards, isErrorCards, isSuccessCards, messageCards } =
    useSelector((state) => state.cards)

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'))
    dispatch(getUsers(loggedInUser))
  }, [dispatch])

  useEffect(() => {
    if (isError) toast.error(message)
  }, [isError])

  useEffect(() => {
    if (isErrorCards) toast.error(messageCards)
  }, [isErrorCards])

  useEffect(() => {
    dispatch(getCards())
  }, [dispatch])

  return isLoading || isLoadingCards ? (
    <Spinner />
  ) : (
    <>
      <header className="users-header">
        <BackButton url="/" />
        <section className="heading">
          <h1>Autres Utilisateurs de Cardoryx</h1>
          <p>Veuillez ajouter les utilisateurs qui vous intéressent</p>
        </section>
      </header>

      <div className="cards">
        {users.map((user) => {
          const userExists = cards.find((card) => card.email === user.email)
          return (
            <CardItemAdd
              key={user._id}
              card={user}
              cards={users}
              addUser={true}
              userExists={userExists ? true : false}
            />
          )
        })}
      </div>
    </>
  )
}

export default CardExchange
