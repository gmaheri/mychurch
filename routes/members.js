const express = require('express');
const {getMembers, addMember, deleteMember, updateMember} = require('../controllers/members')
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname)
  }
});
const upload = multer({storage: storage})

router
.route('/', 'uploads')
.get(getMembers)
.post(upload.single('memberImg'),addMember);



router
.route('/:id')
.delete(deleteMember)
.put(updateMember)

module.exports = router;
