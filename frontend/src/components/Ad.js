import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'


const Ad = ({ ad }) => {
  return (
    <Card className='my-3 p-3 rounded text-centre card'>
      <Link to={`/post/${ad._id}`}>
        <Card.Img className="card-image" src={ad.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/post/${ad._id}`}>
          <Card.Title as='div'>
            <strong>{ad.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div' class="text-info font-italic" >
          {ad.category}
          
        </Card.Text>

        <Card.Text as='h4'>₹{ad.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Ad
