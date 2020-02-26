const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const connectDB = require('./config/db')


//load env var
dotenv.config({path:'./config/config.env'});

//connect DB
connectDB();

const app = express();



//body Parser
app.use(express.json());

//enabble cors
app.use(cors());

//routes
app.use('/mychurch/members', require('./routes/members'));
app.use('/mychurch/member/:id', require('./routes/members'));
app.use('/uploads', express.static('uploads'));
app.use('/mychurch/users', require('./routes/user'));
app.use('/mychurch/users/:id', require('./routes/user'));
app.use('/mychurch/users/signup', require('./routes/user'));
//app.use('/user/login', require('./routes/user'))


const PORT = process.env.PORT ;

app.listen(PORT, () => {console.log(`Server is up and running on Port ${PORT} in ${process.env.NODE_ENV} mode`)})
