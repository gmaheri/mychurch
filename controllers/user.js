const User = require('../models/User');
const bcrypt = require('bcrypt');

//Create Users
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if(err) {
      res.status(500).json({
        Error : err
      })
    } else {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user
      .save()
      .then(result => {
        res.status(201).json({
          message: 'User Created Succesfully!',
          user : result
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          Error: 'Server Error!'
        })
      })

    };
  });
};

//Get All Users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      Success : true,
      count: users.length,
      Users: users
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({Error: 'Server Error!'})
  }
}

//update User
// exports.updateUser = (req, res, next) => {
//   bcrypt.hash(req.body.password, 10, (err, hash) => {
//     if(err){
//       res.status(500).json({Error: 'Server Error'})
//     } else {
//       const user = new User({


//       })

//     }
//   });
//   user
//   .save()
//   .the(result => {
//     res.status(200).json({
//       Success: true,
//       email: req.body.email,
//       password: hash
//     })
//   })
//   .catch(err => {
//     console.error(err);
//     res.status(500).json({Error: 'Server Error!'})
//   })

// }


//Delete a User
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndRemove({_id: req.params.id}, req.body);

    res.status(200).json({
      Succes: true,
      Message : 'User Deleted Succesfully!'
    })
  } catch (err) {
    console.error(err);

    res.status(500).json({Error: "Server Error!"})

  }
}
