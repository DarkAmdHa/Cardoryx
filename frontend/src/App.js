import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewCard from './pages/NewCard'
import Cards from './pages/Cards'
import Card from './pages/Card'
import CardExchange from './pages/CardExchange'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-card" element={<PrivateRoute />}>
              <Route path="/new-card" element={<NewCard />} />
            </Route>
            <Route path="/cards" element={<PrivateRoute />}>
              <Route path="/cards" element={<Cards />} />
            </Route>
            <Route path="/card/:cardId" element={<PrivateRoute />}>
              <Route path="/card/:cardId" element={<Card />} />
            </Route>
            <Route path="/card-exchange" element={<PrivateRoute />}>
              <Route path="/card-exchange" element={<CardExchange />} />
            </Route>
          </Routes>
        </div>
      </Router>

      <ToastContainer />
    </>
  )
}

export default App
