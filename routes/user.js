const express = require('express');
const router =  express.Router();
const {signup, getUsers, deleteUser, login} =require('../controllers/user');


router
.route('/')
.get(getUsers)
//.post(signup)
.post(login)



router.route('/:id')
.delete(deleteUser)
//.put(updateUser)


module.exports = router
