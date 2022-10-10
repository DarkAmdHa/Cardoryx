import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addCard, reset } from '../features/cards/cardSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewCard() {
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.cards
  )

  const [name, setName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [telephoneNumber, setTelephoneNumber] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success('Carte Ajoutée.')
      dispatch(reset())
      navigate('/cards')
    }
    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(addCard({ name, companyName, email, telephoneNumber }))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Ajouter une nouvelle carte</h1>
        <p>Remplissez le formulaire ci-dessous</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              id="name"
              name="name"
              placeholder="Nom  (optionel)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="companyName">Nom de la Compagnie</label>
            <input
              name="companyName"
              id="companyName"
              className="form-control"
              placeholder="Nom de la compagnie (optionel)"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="telephoneNumber">Numero de tel</label>
            <input
              name="telephoneNumber"
              id="telephoneNumber"
              className="form-control"
              placeholder="Numero de tel (optionel)"
              value={telephoneNumber}
              onChange={(e) => setTelephoneNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Soumetter</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewCard
