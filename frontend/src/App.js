import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import AdScreen from './screens/AdScreen'
import LoginScreen from './screens/loginScreen'
import RegisterScreen from './screens/registerScreen'
import ProfileScreen from './screens/ProfileScreen'
import AdListScreen from './screens/adListScreen'
import AdEditScreen from './screens/adEditScreen'


const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
        <Route path='/login' exact component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/post/:id' exact component={AdScreen} />
          <Route path='/postlist' component={AdListScreen} />
          <Route path='/post/:id/edit' component={AdEditScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
