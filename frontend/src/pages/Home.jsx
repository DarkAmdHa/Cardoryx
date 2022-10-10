import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reset as resetUsers } from '../features/auth/authSlice'
import { reset as resetCards } from '../features/cards/cardSlice'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetUsers())
    dispatch(resetCards())
  }, [dispatch])

  return (
    <>
      <section className="heading">
        <h1>
          Bienvenue sur Cardoryx.
          <br /> La solution simple à tous vos besoins en cartes de business{' '}
        </h1>
        <p>Veuillez choisir parmi une des options ci-dessous</p>
      </section>

      <Link to="/new-card" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Ajouter une nouvelle carte
      </Link>
      <Link to="/cards" className="btn btn-block">
        <FaTicketAlt /> Voir mes cartes
      </Link>
      <Link to="/card-exchange" className="btn btn-block">
        Ajouter un utilisateur de cardoryx dans vos cartes
      </Link>
    </>
  )
}

export default Home
