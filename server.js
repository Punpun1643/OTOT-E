const express = require("express")
const axios = require("axios")
const cors = require("cors")
const Redis = require("redis")
const mongoose = require('mongoose');
const newRouter = require('./router.js');

const app = express();
app.use(express.urlencoded({ extended: true }))

app.use(cors());
app.use(express.json());
 
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/otote'

MongoClient.connect(url).then((client) => {
    const db = client.db('otote');
    const ototeCollection = db.collection('otote')
    const ototeRouter = newRouter(ototeCollection)

    app.use('/api/photos', ototeRouter);

    app.listen(8080, () => {
        console.log('listening at 8080...')
    })
})

