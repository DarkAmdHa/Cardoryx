import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCards, reset } from '../features/cards/cardSlice'
import CardItem from '../components/CardItem'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function Cards() {
  const { cards, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.cards
  )

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) dispatch(reset())
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getCards())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Cartes</h1>
      <div className="cards">
        {cards.map((card) => (
          <CardItem key={card._id} card={card} />
        ))}
      </div>
    </>
  )
}

export default Cards
