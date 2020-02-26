const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



//Create Users - signup
exports.signup = (req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then( user => {
    if(user.length >= 1){
      res.status(409).json({
        message: 'Email address already exists'
      });
    } else {
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
    }
  })
};

//tokens - login
exports.login = (req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if(user.length < 1){
      return res.status(401).json({
        message: 'Authorisation failed'
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if(err){
        return res.status(401).json({
          message: 'Authorisation failed'
        });
      }
      if(result){
       const token =  jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        },
        process.env.JWT_KEY,
        {
          expiresIn: '1h'
        }
        );
        return res.status(200).json({
          message: 'Authorisation Successful',
          token: token
        });
      }
      res.status(401).json({
        message: 'Authorisation failed'
      });
    })
  })
  .catch(err => {
    return res.status(500).json({Error: 'Server Error!'})
  })
}

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

//Delete a User
exports.deleteUser = async  (req, res, next) => {
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
