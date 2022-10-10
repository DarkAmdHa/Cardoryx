import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCard } from '../features/cards/cardSlice'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    mariginRight: '-50%',
    transform: 'translate(-50%,-50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

function Card() {
  const { isLoading, isError, isSuccess, message, card } = useSelector(
    (state) => state.cards
  )

  const { cardId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getCard(cardId))
  }, [isError, message, getCard, cardId])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/cards" />
        <h2>
          Card ID: {card._id}
          <span className={`status status-${card.status}`}>{card.status}</span>
        </h2>
        <h3>
          Date Submitted: ${new Date(card.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: ${card.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{card.description}</p>
        </div>
      </header>
    </div>
  )
}

export default Card
