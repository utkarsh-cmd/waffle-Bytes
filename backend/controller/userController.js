
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


// ROUTE     POST /api/users/login
// DESC      login user
// ACCESS    public

const login = asyncHandler(async(req,res)=>{
    const { email ,password} = req.body;

    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json ({
            _id: user._id,
            email:user.email,
            name : user.name,
            contact:user.contact,
            token : generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error('password or email is not valid')
    }

})


// ROUTE     GET /api/users
// DESC      get user details
// ACCESS    private

const getProfile = asyncHandler(async(req,res)=>{
    

    const user = await User.findById(req.user._id)
    if(user ){
        res.json ({
            _id: user._id,
            email:user.email,
            name : user.name,
            contact:user.contact,
            
        })
    }
    else{
        res.status(404)
        throw new Error('user not found')
    }

})

// ROUTE     GET /api/users/:id
// DESC      get user details by id
// ACCESS    public

const getProfileByID = asyncHandler(async(req,res)=>{
    

    const user = await User.findById(req.params.id)
    if(user ){
        res.json ({
            _id: user._id,
            email:user.email,
            name : user.name,
            contact:user.contact,
            
        })
    }
    else{
        res.status(404)
        throw new Error('user not found')
    }

})

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password ,contact} = req.body
  
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    const user = await User.create({
      name,
      email,
      password,
      contact,
    })
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        contact:user.contact,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })

  // @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contact:user.contact
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
  
  
  // @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.contact = req.body.contact || user.contact
      if (req.body.password) {
        user.password = req.body.password
      }
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
       contact:updatedUser.contact,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })

export {login ,getUserProfile, getProfile,getProfileByID,registerUser,updateUserProfile}