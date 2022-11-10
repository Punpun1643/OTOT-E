const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const axios = require('axios');

const Redis = require("redis")

const client = Redis.createClient()
client.connect()

const DEFAULT_EXPIRATION = 3600;

const newRouter = function (collection) {

    const router = express.Router();
    
    // Function for catching errors, this is to keep the code DRY
    const errorCatcher = function(inputError) {
      console.error(inputError);
      res.status(500);
      res.json({ status: 500, error: inputError })
    }
    
    // Route for getting all data
    router.get('/', async (req, res) => {
        const photos = await client.get('photos')
        if (photos) {
            console.log('cache hit')
            res.json(JSON.parse(photos))
        } else {
            try {
                console.log('cache miss')
                const  data  = await collection.find().toArray();
                client.setEx('photos', DEFAULT_EXPIRATION, JSON.stringify(data))
                res.json(data)
            } catch (error) {
                console.error(error)
                res.json({data: error})
            }
        }
    });
    return router;
}

module.exports = newRouter;
  