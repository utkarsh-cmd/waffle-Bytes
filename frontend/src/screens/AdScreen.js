import React, {  useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listAdDetails } from '../Redux/actions/adActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails } from '../Redux/actions/userAction'



const AdScreen = ({ match }) => {

  const dispatch = useDispatch()

  const adDetails = useSelector((state) => state.adDetails)
  const { loading, error, ad } = adDetails
  
const userDetails = useSelector(state => state.userDetails)
const {loading:UserLoading , user}=userDetails
  useEffect(() => {
    dispatch(listAdDetails(match.params.id))
    if(ad.user)
    dispatch(getUserDetails(ad.user))
    
  }, [dispatch,ad.user, match])

  console.log(ad)

  return (
    <>
    {loading ? <div><Loader/></div> : error? <Message>{error}</Message> :
    <>
    <Link className='btn btn-light my-3' to='/'>
      Go Back
    </Link>
    <Row>
      <Col md={6}>
        <Image src={`/${ad.image}`} alt={ad.name} fluid />
      </Col>
      <Col md={3}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h3>{ad.name}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
          
          </ListGroup.Item>
          <ListGroup.Item>Posted by: {UserLoading?<Loader/> :<strong>{user.name}</strong> } </ListGroup.Item>
          <ListGroup.Item>Description: {ad.description}</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>₹{ad.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  </>
  }
  </>
  )
}

export default AdScreen
