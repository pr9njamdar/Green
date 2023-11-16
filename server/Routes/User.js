const express=require('express')
const cors=require('cors');
const router=express.Router();
const multer = require('multer');
const mongoose=require('mongoose')
const path = require('path');

const {GreenUser, Complaint}=require('../mongodb');
router.use(express.json())
router.use(express.urlencoded({extended:false}))
router.use(cors())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './complaints'); // The directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
 
  const upload = multer({ storage: storage });
  router.use('./complaints',express.static('complaints'))

router.post('/Register', async (req,res)=>{
    const {name,password,email}=req.body;
    const user = new GreenUser({username:name,password:password,email:email})
    await user.save().then((doc)=>{
        console.log('User Saved');
        res.send(doc);
    })
})

router.post('/RegisterComplaint',upload.single('image'),async(req,res)=>{
        const { file } = req;
        if (!file) {
          return res.status(400).send('No file uploaded.');
        }  
        //const imgpath=`../complaints/${file.filename}`
        const{Description,type,location,uid}=req.body;
        img=file.filename;
        const userid=new mongoose.Types.ObjectId(uid);
        const complaint=new Complaint({type:type,reporter:userid,location:location,Description:Description,imagepath:img})
        await complaint.save().then(async(doc)=>{
          const id=doc.id;
          await GreenUser.findByIdAndUpdate(uid,{$push:{Complaints:{complaint:id}}});
        })
        return res.status(200).send('complaint was registered');
      
})

router.post('/Login',async (req,res)=>{
    const {password,email}=req.body;
    User.findOne({email:email}).then((doc)=>{
        if(doc)
        {
            if(doc.password===password) res.send(doc.id).status(200);
            else res.send('Password incorrect').status(401);
        }
        else
        {
            res.send('Creds incorrect').status(401);
        }
    })   
})

module.exports=router;
