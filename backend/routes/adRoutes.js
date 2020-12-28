import express from 'express'
import { getAds,getAd, deleteAd, updateAd, createAd } from '../controller/adController.js';
import {protect} from '../middleware/protect.js'

const Router = express.Router();

Router.route('/').get(getAds).post(protect, createAd)
Router
  .route('/:id')
  .get(getAd)
  .delete(protect, deleteAd)
  .put(protect, updateAd)

export default Router