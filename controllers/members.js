const Church = require('../models/Members');


//desc GET all church members
//route GET /mychurch/members

exports.getMembers = async (req, res, next) => {
  try {
    const members = await Church.find();

    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
      memberImg: members.memberImg
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({Error: 'Server Error!'})

  }
};

//desc Add a member
exports.addMember = async(req, res, next) => {
  console.log(req.file)
  try {
    const member = await Church.create(req.body);

    res.status(201).json({
      success : true,
      msg: 'Member added Successfully!',
      addedMember: {
        name: member.name,
        memberNo: member.memberNo,
        memberImg: req.file.path,
        request: {
          type: 'GET',
          url:'http://localhost:4200/mychurch/members/'+member._id
        },

      }
    })

  } catch (err) {
    console.error(err);
    if(err.code === 11000){
      return res.status(400).json({Error: `Member already exists!`})
    }
    res.status(500).json({Error: 'Server Error!'})
  }
};

//desc update a member
exports.updateMember = async (req, res, next) => {
  try {
    const member = await Church.findOneAndUpdate({_id: req.params.id}, req.body);
    const updatedMember = await Church.findOne({_id: req.params.id})

    res.status(200).json({
      success: true,
      msg: 'Member updated Successfully',
      data: updatedMember
    })

  } catch (err) {
    console.error(err);

    return res.status(500).json({Error: 'Server Error!'})

  }

}

//desc delete a member
exports.deleteMember = async (req, res,next) => {
  try {
    const member = await Church.findByIdAndRemove({_id: req.params.id,}, req.body);

    res.status(200).json({
      success: true,
      msg: 'Memeber deleted Succesfully'
    })

  } catch (err) {
    console.log(err)

    return res.status(500).json({Error: 'Server Error!'})

  }
}
