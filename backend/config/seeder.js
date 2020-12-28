import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './db.js'
import users from '../data/users.js'
import ads from '../data/ad.js'
import User from '../models/userModel.js'
import Ad from '../models/adModel.js'

dotenv.config();

connectDB()

const importData = async() =>{
try {
    await User.deleteMany();
    await Ad.deleteMany();

    const createdUsers =  await User.insertMany(users);
    const poster = createdUsers[0]._id;

    const sampleAds = ads.map((ad) =>{
        return {...ad , user: poster} 
    })
    
    await Ad.insertMany(sampleAds)

    console.log("data Imported!".green.inverse);
    process.exit()
} catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
}
}

const destroyData = async () => {
    try {
    
      await Ad.deleteMany()
      await User.deleteMany()
  
      console.log('Data Destroyed!'.red.inverse)
      process.exit()
    } catch (error) {
      console.error(`${error}`.red.inverse)
      process.exit(1)
    }
  }
  
  if (process.argv[2] === '-d') {
    destroyData()
  } else {
    importData()
  }