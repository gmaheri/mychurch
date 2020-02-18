const mongoose = require('mongoose');

const MembersSchema = new mongoose.Schema({
  name:{
    type: String,
    trim: true,
    require:[true, 'Please enter members names']
  },
  gender: {
    type: String,
    required:[true, 'Gender field cannot be empty']
  },
  memberNo: {
    type: String,
    required:[true, 'please eneter member no'],
    unique: true,
  },
  telephone: {
    type: Number,
    required:[true, 'please enter phone number']
  },
  ministries:{
    type:[String],
    trim: true
  },
  memberImg:{
    type: String,
  }
});

module.exports = mongoose.model('Church', MembersSchema);
