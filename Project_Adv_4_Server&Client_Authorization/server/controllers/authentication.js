const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id , iat: timestamp }, config.secret); //sub = subject who is this token
};   //iat - issued at time

exports.signin = function(req, res, next) {
    //User has already had their email and password auth'd
    //We just need to give them a token
  res.send({ token: tokenForUser(req.user)});
};

exports.signup = function(req, res, next) {
    //res.send({ success: 'true' });

    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(422).send({ error: "you must provide email and password" });
    }
    //See if a user with the given email exist
    User.findOne({ email: email }, function(err, existingUser){ //User represents all users in DB
        if(err) { return next(err); }

        //If a user with email does exist, return an error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }

        //If a user with email does NOT exist create and save user record
        const user = new User({ //only create
            email: email, 
            password: password
        });
        user.save( function(err){
            if(err) { return next(err); }
            
            //Respond to request indication the user was craeted
            //res.json(user);
            res.json({ token: tokenForUser(user) });
        }); //save data in DB

    });
}
