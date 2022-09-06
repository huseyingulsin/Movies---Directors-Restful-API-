const router = require('express').Router()

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {check, validationResult} = require('express-validator')
//Models	
const User = require('../models/users');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'movie api' });
});

router.post('/register', [
	check('username',"please provide a username that is greater than 3")
.isLength({
	min: 3,
})],(req, res, next) => {
	const { username, password } = req.body;

		
	const errors = validationResult(req)
	
	if(!errors.isEmpty()) {
		return res.status(400).json({
			errors:errors.array()
		})
	}
	bcrypt.hash(password, 10).then((hash) => {
		const user = new User({
			username,
			password: hash
		});

		const promise = user.save();
		
		promise.then((data) => {
			res.json(data)
		}).catch((err) => {
			res.json(err);
		})
	});
});

router.post('/authenticate', (req, res) => {
	const { username, password } = req.body;

	User.findOne({
		username
	}, (err, user) => {
		if (err)
			throw err;

		if(!user){
			res.json({
				status: false,
				message: 'Authentication failed, user not found.'
			});
		}else{
			bcrypt.compare(password, user.password).then((result) => {
				if (!result){
					res.json({
						status: false,
						message: 'Authentication failed, wrong password.'
					});
				}else{
					const payload = {
						username
					};
					const token = jwt.sign(payload, req.app.get('api_secret_key'), {
						expiresIn: 720 // 12 saat
					});

					res.json({
						status: true,
						token
					})
				}
			});
		}
	});

});

module.exports = router;