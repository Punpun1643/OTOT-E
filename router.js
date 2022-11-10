const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const newRouter = function (collection) {

    const router = express.Router();
    
    // Function for catching errors, this is to keep the code DRY
    const errorCatcher = function(inputError) {
      console.error(inputError);
      res.status(500);
      res.json({ status: 500, error: inputError })
    }
    
    // Route for getting all staff data
    router.get('/', (req, res) => {
      collection
        .find()
        .toArray()
        .then((docs) => res.json(docs))
        .catch((err) => errorCatcher(err));
    });

    return router;
}

module.exports = newRouter;
  