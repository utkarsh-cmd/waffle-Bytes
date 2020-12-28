import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { adCreateReducer, adDeleteReducer, adDetailsReducer, adListReducer, adUpdateReducer } from './reducers/adReducer'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducer'

const reducer = combineReducers({
adList : adListReducer,
adDetails : adDetailsReducer,
userLogin: userLoginReducer,
userRegister: userRegisterReducer,
userDetails: userDetailsReducer,
userUpdateProfile: userUpdateProfileReducer,
adDelete: adDeleteReducer,
  adCreate: adCreateReducer,
  adUpdate: adUpdateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}


const middleware = [thunk]

const store = createStore(reducer, initialState , composeWithDevTools(applyMiddleware(...middleware)))

export default store