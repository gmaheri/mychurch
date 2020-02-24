const express = require('express');
const router =  express.Router();
const {signup, getUsers, deleteUser} =require('../controllers/user')

router
.route('/')
.get(getUsers)
.post(signup)

router.route('/:id')
.delete(deleteUser)
//.put(updateUser)


module.exports = router
