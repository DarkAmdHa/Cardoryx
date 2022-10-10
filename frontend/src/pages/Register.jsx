import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
    name: '',
    companyName: '',
    email: '',
    telephoneNumber: '',
  })

  const {
    username,
    password,
    password2,
    name,
    companyName,
    email,
    telephoneNumber,
  } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    //Rediriger une fois connecte
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [isError, message, isSuccess, user, navigate, reset])

  const onSubmit = (e) => {
    e.preventDefault()

    if (password != password2) {
      toast.error('Les mots de passe ne correspondent pas')
    } else if (username === '') {
      toast.error("Veuillez fournir un nom d'utilisateur")
    } else if (name === '') {
      toast.error('Veuillez fournir votre nom')
    } else {
      const userData = {
        username,
        password,
        name,
        companyName,
        email,
        telephoneNumber,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Enregistrer
        </h1>
        <p>Veuillez créer un compte</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              placeholder="Entrez votre nom d'utilisateur"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirmez votre mot de passe"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Votre Nom"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Votre email (optionel)"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="companyName"
              name="companyName"
              value={companyName}
              onChange={onChange}
              placeholder="Nom de la Compagnie (optionel)"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="telephoneNumber"
              name="telephoneNumber"
              value={telephoneNumber}
              onChange={onChange}
              placeholder="Votre numero de cel (optionel)"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Soumettre</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
