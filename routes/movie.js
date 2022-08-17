const express = require('express');
const router = express.Router();

//models
const Movie = require('../models/Movie')

router.get('/',(req,res) => {
  const promise = Movie.find({});
  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })
})
// top 10 listesi

router.get('/top10',(req,res) => {
  const promise = Movie.find({}).limit(10).sort({imbd_score:-1});
  promise.then((data) => {
      res.json(data);
  }).catch((err) => {
    res.json(err)
  })
})

// it defines dates between start and end years. gte - and lte works for define the min-max range. 
router.get('/between/:start_year/:end_year'),(req,res,next) => {
  const {start_year,end_year} = req.params
  const promise  = Movie.find({
    year:{"$gte":parseInt(start_year),"$lte":parseInt(end_year)}
  })
  promise.then((movie) => {
      res.json(movie)
  }).catch((err) => {
   next({message: 'belirtilen aralıkda movie bulunamadı'})
  })

router.get('/:movie_id',(req,res,next) => {
  const promise = Movie.findById(req.params.movie_id)
  promise.then((movie) => {
    if(!movie)
      next({message: 'the movie was not found'})
    
    res.json(movie)
  
  }).catch((err) => {
    next({message: 'the movie was not found'})})

})



router.put('/:movie_id',(req,res,next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true})
  promise.then((movie) => {
      if(!movie) {
        next({message: 'the movie was nout found'})

      }
      res.json(movie)
      
  }).catch((err) => {
    next({message: 'the movie was not found'})
  })
})


router.delete('/:movie_id',(req,res,next) =>  {
    const promise = Movie.findByIdAndRemove(req.params.movie_id);
    promise.then((movie) => {
      if(!movie) {
        next({message: 'movie was not found'})
      }
      res.json(movie)
    }).catch((err) => {
      res.json(err);
    })
})


router.post('/', (req, res, next) => {
	// const { title, imdb_score, category, country, year } = req.body;

	const movie = new Movie(req.body);
	const promise = movie.save();

	promise.then((data) => {
		res.json(data);
	}).catch((err) => {
		res.json(err);
	});


});

module.exports = router; 

