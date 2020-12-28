import multer from 'multer'
import express from 'express'
import path from 'path'
const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
  })

  const checkFileType = ( file ,cb) =>{
      const types = /jpg|jpeg|png/
      const extname = types.test(path.extname(file.originalname).toLowerCase())
      const mimetype = types.test(file.mimetype)
      if(extname && mimetype){
          return cb(null,true)
      }
      else {
          return cb('images only')
      }
  }


  const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
    },
  })

  router.post('/', upload.single('image'),(req,res)=>{
      res.send(`${req.file.path}`)
  })

  export default router