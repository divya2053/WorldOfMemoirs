// eslint-disable-next-line
const nodefetch = require('node-fetch');

// requiring dependencies, models and middlewares
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const methodOverride = require('method-override');
const { stringify } = require('querystring');
const fs = require('fs');
const User = require('../models/User.model');
const auth = require('../middlewares/auth');
const {
	signupValidation,
	updateValidation,
	loginValidation,
} = require('../middlewares/validations/user');
const Blog = require('../models/Blog.model');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req, file, cb) {
		cb(
			null,
			new Date().toISOString().replace(/:/g, '-') + file.originalname
		);
	},
});

const fileFilter = (req, file, cb) => {
	// reject a file
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter: fileFilter,
});

const router = express.Router();
router.use(methodOverride('_method'));
// GET request for Sign Up
router.get('/sign-up', auth, async (req, res) => {
	if (req.user) {
		res.redirect('/');
	} else {
		res.render('./auth/signUp', {
			error: '',
			data: {
				firstName: '',
				lastName: '',
				userName: '',
				password: '',
				email: '',
				confirmPassword: '',
			},
		});
	}
});

// GET request for Log In
router.get('/log-in', auth, async (req, res) => {
	if (req.user) {
		res.redirect('/');
	} else {
		res.render('./auth/logIn', {
			error: '',
			data: {
				email: '',
				password: '',
			},
		});
	}
});

// to view own profile
router.get('/read-profile', auth, async (req, res) => {
	const _id = req.user;
	const user = await User.findById(_id);
	res.render('./useritems/read-profile', {
		user,
		isAuthenticated: !!req.user,
		error: '',
	});
});
router.post(
	'/read-profile',
	upload.single('photo'),
	auth,
	updateValidation,
	async (req, res) => {
		const updates = Object.keys(req.body);
		const allowedUpdates = [
			'firstName',
			'lastName',
			'userName',
			'email',
			'password',
		];
		const isValid = updates.every((update) =>
			allowedUpdates.includes(update)
		);

		if (!isValid) {
			res.status(400).send('invalid update property');
		}
		if (req.file) {
			updates.push('photo');
			req.body.photo = req.file.path;
		}
		req.body.email = req.body.email.toLowerCase();
		try {
			const id = await req.user;
			const user = await User.findById(id._id);
			if (req.file) {
				fs.unlink(user.photo, () => {});
			}
			// eslint-disable-next-line
			updates.forEach((update) => (user[update] = req.body[update]));
			await user.save();
			res.redirect('/dashboard');
		} catch (e) {
			res.status(500).send(e);
		}
	}
);

// POST request for sign up
router.post(
	'/sign-up',
	upload.single('photo'),
	signupValidation,
	async (req, res) => {
		const {
			firstName,
			lastName,
			userName,
			email,
			password,
			confirmPassword,
		} = req.body;
		if (!req.body['g-recaptcha-response']) {
			return res.status(401).render('./auth/signUp', {
				error: 'Please select captcha.',
				data: {
					firstName,
					lastName,
					userName,
					password,
					email,
					confirmPassword,
				},
			});
		}

		if (req.rawHeaders[1] !== 'localhost:3000') {
			// Secret key
			const secretKey = process.env.SECRET_KEY_CAPTCHA;

			// Verify URL
			const query = stringify({
				secret: secretKey,
				response: req.body['g-recaptcha-response'],
				remoteip: req.connection.remoteAddress,
			});

			const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

			// Make a request to verifyURL
			const body = await nodefetch(verifyURL).then((res) => res.json());

			// If not successful
			if (body.success !== undefined && !body.success) {
				return res.status(401).render('./auth/signUp', {
					error: 'Failed captcha verification',
					data: {
						firstName,
						lastName,
						userName,
						password,
						email,
						confirmPassword,
					},
				});
			}
		}
		// return res.json({
		// 	success: false,
		// 	msg: 'Failed captcha verification',
		// });

		// Check if the username or email already taken
		User.findOne(
			{ $or: [{ email: email.toLowerCase() }, { userName }] },
			() => {
				User.findOne({ userName }, (err, doc) => {
					if (doc) {
						return res.status(401).render('./auth/logIn', {
							error: 'Username already taken!',
							data: {
								firstName,
								lastName,
								userName,
								password,
								email,
								confirmPassword,
							},
						});
					}
					const data = {
						firstName,
						lastName,
						userName,
						password,
						email: email.toLowerCase(),
					};
					if (req.file) {
						data.photo = req.file.path;
					}
					const newUser = new User(data);

					newUser.save((err, doc) => {
						if (err || !doc) {
							return res.status(422).render('./auth/logIn', {
								error: 'Oops something went wrong!',
								data: {
									firstName,
									lastName,
									userName,
									email,
									password,
								},
							});
						}
						const token = jwt.sign(
							{ _id: doc._id },
							process.env.SECRET_KEY
						);

						// Send back the token to the user as a httpOnly cookie
						res.cookie('token', token, {
							httpOnly: true,
						});
						res.redirect('/');
					});
				});
			}
		);
	}
);

// POST request for log in
router.post('/log-in', loginValidation, async (req, res) => {
	const { email, password } = req.body;

	User.findOne({ email: email.toLowerCase() }, (err, doc) => {
		if (err || !doc) {
			return res.status(401).render('./auth/logIn', {
				error: 'Invalid email or password!',
				data: {
					email,
					password,
				},
			});
		}
		bcrypt.compare(password, doc.password, (err, matched) => {
			if (err || !matched) {
				return res.status(401).render('./auth/logIn', {
					error: 'Invalid email or password!',
					data: {
						email,
						password,
					},
				});
			}

			const token = jwt.sign(
				{ _id: doc._id, email },
				process.env.SECRET_KEY
			);

			res.cookie('token', token, {
				httpOnly: true,
			});

			res.redirect('/');
		});
	});
});

// Post route for log-out
router.post('/log-out', auth, async (req, res) => {
	res.clearCookie('token');
	res.redirect('/');
});

//* route    /author/:id
//* desc     Fetch the required user's blogs
router.get('/author/:id', auth, async (req, res) => {
	// If the requested author is the currently logged in user then redirect them to their dashbaord
	if (req.user) {
		if (req.params.id.toString() === req.user._id.toString())
			return res.redirect('/dashboard');
	} else {
		return res.redirect('/log-in');
	}
	try {
		try {
			const user = await User.findById(req.params.id);
			if (!user) return res.redirect('/error');
			let toggleunfollow = false;
			user.followers.forEach((item) => {
				if (item.toString() === req.user._id.toString()) {
					toggleunfollow = true;
				}
			});
			const likedBlogs = await Blog.find({
				_id: { $in: user.likedPosts },
				status: 'Public',
			});
			const blogs = await Blog.find({
				author: req.params.id,
				status: 'Public',
			})
				.populate('author')
				.sort({ timestamps: 'desc' })
				.lean();
			return res.render('./useritems/author', {
				user,
				toggleunfollow,
				posts: blogs,
				isAuthenticated: !!req.user,
				likedBlogs: likedBlogs,
			});
		} catch (error) {
			return res.redirect('/error');
		}
	} catch (error) {
		return res.redirect('/error');
	}
});

//* route    /dashboard/
//* desc     Fetch the logged in user's blogs
router.get('/dashboard', auth, async (req, res) => {
	if (!req.user) return res.redirect('/log-in');
	try {
		try {
			const user = await User.findById(req.user._id);
			if (!user) return res.redirect('/error');
			const blogs = await Blog.find({ author: req.user._id })
				.populate('author')
				.sort({ timestamps: 'desc' })
				.lean();
			const allusers = await User.find({});
			const likedBlogs = await Blog.find({
				_id: { $in: user.likedPosts },
			}).populate('author');
			const myfollowingBlogs = await Blog.find({
				author: { $in: user.following },
			}).populate('author');
			return res.render('./useritems/dashboard', {
				user,
				allusers,
				posts: blogs,
				isAuthenticated: !!req.user,
				likedBlogs,
				myfollowingBlogs,
			});
		} catch (error) {
			return res.redirect('/error');
		}
	} catch (error) {
		return res.redirect('/error');
	}
});

router.get('/follow/:id', auth, async (req, res) => {
	if (!req.user) return res.redirect('/log-in');

	User.findByIdAndUpdate(
		req.params.id,
		{
			$push: { followers: req.user._id },
		},
		{ new: true },
		(err) => {
			if (err) {
				return res.status(422).json({ error: err });
			}
			User.findByIdAndUpdate(
				req.user._id,
				{
					$push: { following: req.params.id },
				},
				{ new: true }
			)
				.select('-password')
				.then(() => res.redirect(`/author/${req.params.id}`))
				.catch((err) => res.status(422).json({ error: err }));
		}
	);
});

router.get('/unfollow/:id', auth, async (req, res) => {
	if (!req.user) return res.redirect('/log-in');

	User.findByIdAndUpdate(
		req.params.id,
		{
			$pull: { followers: req.user._id },
		},
		{ new: true },
		(err) => {
			if (err) {
				return res.status(422).json({ error: err });
			}
			User.findByIdAndUpdate(
				req.user._id,
				{
					$pull: { following: req.params.id },
				},
				{ new: true }
			)
				.select('-password')
				.then(() => res.redirect(`/author/${req.params.id}`))
				.catch((err) => res.status(422).json({ error: err }));
		}
	);
});

router.delete('/profile/:userId/delete', auth, async (req, res) => {
	if (!req.user) return res.redirect('/log-in');
	const { userId } = req.params;
	if (req.user._id.toString() !== userId.toString())
		return res.render('404', { isAuthenticated: !!req.user });

	const user = await User.findById({ _id: userId });
	fs.unlink(user.photo, () => {});
	user.photo = '/images/Default_Profile.jpg';
	await user.save();
	res.redirect('/dashboard');
});

module.exports = router;
