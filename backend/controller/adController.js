import asyncHandler from 'express-async-handler'
import Ad from '../models/adModel.js'
import User from '../models/userModel.js'

// ROUTE     GET /api/post
// DESC      getting all the ads
// ACCESS    public



const getAds = asyncHandler ( async(req,res)=>{

    const ads = await Ad.find({});
    if (ads)
    res.json(ads)
    else 
    throw new Error (`ads not found`)
    
})

// ROUTE     GET /api/post/:id
// DESC      getting the ad by its id
// ACCESS    public



const getAd = asyncHandler ( async(req,res)=>{

    const ad = await Ad.findById(req.params.id);
    if (ad)
    res.json(ad)
    else
    throw new Error (`ad doesnt exist`)
    
})

// @desc    Delete an Ad
// @route   DELETE /api/post/:id
// @access  Private
const deleteAd = asyncHandler(async (req, res) => {
    const ad = await Ad.findById(req.params.id)
  
    if (ad ){
        await ad.remove()
        res.json({ message: 'Ad removed' })
    }
    else {
        res.status(404)
        throw new Error('Ad not found')
      }
        


      
    } 
  )
  
  // @desc    Create a Ad
  // @route   POST /api/post
  // @access  Private/Admin
  const createAd = asyncHandler(async (req, res) => {
    const ad = new Ad({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      category: 'Sample category',
      description: 'Sample description',
    })
  
    const createdAd = await ad.save()
    res.status(201).json(createdAd)
  })
  
  // @desc    Update a post
  // @route   PUT /api/post/:id
  // @access  Private/Admin
  const updateAd = asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
     category,
    } = req.body
  
    const ad = await Ad.findById(req.params.id)
  
    if (ad) {
       
            ad.name = name
            ad.price = price
            ad.description = description
            ad.image = image
            
            ad.category = category
            
        
            const updatedAd = await ad.save()
            res.json(updatedAd)
        
       
     
    } else {
      res.status(404)
      throw new Error('Ad not found')
    }
  })

export {getAds,getAd,deleteAd,updateAd,createAd}