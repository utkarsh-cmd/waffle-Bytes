import React, {  useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Ad from '../components/Ad'
import {useDispatch,useSelector} from 'react-redux'
import { listAds } from '../Redux/actions/adActions'
import Message from '../components/Message'
import Loader from '../components/Loader'


const HomeScreen = () => {
 

  const dispatch = useDispatch()
  const adList = useSelector(state => state.adList)
  const {ads,loading,error} = adList;
  useEffect(() => {
    dispatch(listAds())
    
  }, [dispatch])

  return (
    <>
      {loading?<Loader/>:error?<Message>{error}</Message>:
      <>
      <h2>Latest Ads</h2>
      <Row>
        {ads.map((ad) => (
          <Col key={ad._id} sm={12} md={6} lg={4} xl={3}>
            <Ad ad={ad} />
          </Col>
        ))}
      </Row>
      </>
      }
    </>
  )
}

export default HomeScreen
