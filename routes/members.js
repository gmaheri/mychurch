const express = require('express');
const {getMembers, addMember, deleteMember, updateMember} = require('../controllers/members')
const router = express.Router();

router
.route('/')
.get(getMembers)
.post(addMember);

router
.route('/:id')
.delete(deleteMember)
.put(updateMember)

module.exports = router;
