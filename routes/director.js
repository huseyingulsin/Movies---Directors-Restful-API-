const { json } = require('express');
const express = require('express');
const router = express.Router();

const Director = require('../models/Director');

// models
router.post('/', function(req, res, next) {
 const director = new Director(req.body)
 const promise = director.save();
  promise.then((data) => {
    res.json(data)
  }).catch((error) => {res.json(error)})

});


router.get('/',(req,res) => {
  const promise =  Director.aggregate([
    {
      $lookup:{
        from:'movies',
        localField:'_id',
        foreignField:'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path:'movies',
        preserveNullAndEmptyArrays:True
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        },
        
      },

    },
    {
      project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies: '$movies'
      }
    }
  ])
  promise.then((data) => {
    res.json(data)
  }).catch((err) => {res.json(err)})

})
router.get('/:director_id',(req,res) => {
  const promise =  Director.aggregate([
      {
        $match: {
        '$_id':req.params.director_id
      }
    }

    ,{
      $lookup:{
        from:'movies',
        localField:'_id',
        foreignField:'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path:'movies',
        preserveNullAndEmptyArrays:True
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        },
        
      },

    },
    {
      project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies: '$movies'
      }
    }
  ])
  promise.then((data) => {
    res.json(data)
  }).catch((err) => {res.json(err)})

})

// director updating
router.put('/:director_id', (req,res,next) => {
  const promise = Director.findByIdAndUpdate(req.params.director_id,req.body,{new:True});


  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })
})

// director deleting

router.put('/:director_id',(req,res,next) =>  {
  const promise = Director.findByIdAndDelete(req.params.director_id);

  promise.then((data) => {
    res.json(data)
  }).catch((err) => { res.json(err) })
})

module.exports = router;
