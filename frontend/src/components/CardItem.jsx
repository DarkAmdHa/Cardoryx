import { Link } from 'react-router-dom'

function CardItem({ card }) {
  return (
    <div className="card">
      {card.companyName && (
        <div class="companyName">Compagnie: {card.companyName}</div>
      )}

      <div className="nameEmailContainer">
        <div class="name">Nom: {card.name}</div>
        {card.email && <div class="email">Email: {card.email}</div>}
      </div>
      {card.telephoneNumber && (
        <div class="telephoneNumber">Numero Tel: {card.telephoneNumber}</div>
      )}
    </div>
  )
}

export default CardItem
