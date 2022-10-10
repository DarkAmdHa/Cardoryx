import { Link } from 'react-router-dom'

function CardItem({ card }) {
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
    </div>
  )
}

export default CardItem
