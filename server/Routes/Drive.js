const express=require('express')
const cors=require('cors');
const router=express.Router();
const multer = require('multer');
const mongoose=require('mongoose')
const path = require('path');

const {GreenUser, Drive}=require('../mongodb');
router.use(express.json())
router.use(express.urlencoded({extended:false}))
router.use(cors())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Drives'); // The directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
 
  const upload = multer({ storage: storage });
  router.use('./Drives',express.static('Drives'))

router.post('/Organize',upload.single('image'),async(req,res)=>{
                
        //const imgpath=`../complaints/${file.filename}`
        const{title,message,type,uid,address}=req.body;
         img=req.file.file.filename;        
        const userid=new mongoose.Types.ObjectId(uid);
        // make sure to include image path
        const NewDrive = new Drive({organizer:userid,type:type,Details:message,title:title,location:address,imagepath:img});
        await NewDrive.save().then((doc)=>{console.log(doc)})       
        return res.status(200).send('complaint was registered');
      
})

module.exports=router;