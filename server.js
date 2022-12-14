//import cors from 'cors';
//import express from 'express'
//const express = require('express');
//const cors = require('cors');
//app = express();
//app.use(cors());
//app.use(cors())
//app.use(cors({ origin: true, credentials: true }));



//app.use(cors({ origin: '*' }));

//res.header("Access-Control-Allow-Origin");


//app.use(cors({ origin: process.env.CLIENT_URL }));
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });




const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// db
mongoose
    .connect(process.env.DATABASE_CLOUD, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const linkRoutes = require('./routes/link');

// app middlewares
app.use(morgan('dev'));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }));
// app.use(cors());
app.use(cors({ origin: process.env.CLIENT_URL }));

// middlewares
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', linkRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`API is running on port ${port}`));
