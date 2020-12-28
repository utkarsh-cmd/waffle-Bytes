import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listAds,
  deleteAd,
  createAd,
} from '../Redux/actions/adActions'
import { AD_CREATE_RESET } from '../Redux/Constant'

const AdListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const adList = useSelector((state) => state.adList)
  const { loading, error, ads } = adList


  const adDelete = useSelector((state) => state.adDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = adDelete

  const adCreate = useSelector((state) => state.adCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    ad: createdAd,
  } = adCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  

  useEffect(() => {
    dispatch({ type: AD_CREATE_RESET })

    if (!userInfo) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/post/${createdAd._id}/edit`)
    } else {
      dispatch(listAds())
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdAd,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteAd(id))
    }
  }

  const createAdHandler = () => {
    dispatch(createAd())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Ads</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createAdHandler}>
            <i className='fas fa-plus'></i> Create Ad
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              userInfo &&
              ad.user ===userInfo._id &&
              <tr key={ad._id}>
                <td>{ad._id}</td>
                <td>{ad.name}</td>
                <td>₹ {ad.price}</td>
                <td>{ad.category}</td>
               
                <td>
                  <LinkContainer to={`/post/${ad._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(ad._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default AdListScreen