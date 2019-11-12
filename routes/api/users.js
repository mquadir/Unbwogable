const express = require('express');
const router = express.Router(); 
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({message: "users works"}));

// @route   POST api/users/test
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    User.findOne({email : req.body.email}).then(user => {
        if(user){
            return res.status(400).json({email: 'Email already exists'});
        } else {
            const avatar = gravatar.url(req.body.email, {
                // Size
                s: '200',
                // Rating
                r: 'pg', 
                // Default
                d: 'mm'
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar : avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                })
            });
        }
    })
});

// @route   POST api/users/test
// @desc    Login user / Return JWT token
// @access  Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({email})
    .then(user => {
        if(!user){
            return res.status(404).json({email: 'User not found'});
        }

        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(isMatch){
                res.json({message: 'Success'});
            } else {
                return res.status(400).json({password: 'Password incorrect'});
            }
        })
    });
});


module.exports = router;