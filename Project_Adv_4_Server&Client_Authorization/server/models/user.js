const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

//Define our model
const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

//on Save Hook,  encrypt password
//pre('save') means before saving a model run this function
UserSchema.pre('save', function(next) {
    //get access to the user model
    const user = this;

    //generate a salt then ruc callback
    bcrypt.genSalt(10, function(err, salt) {
        if(err) { return next(err); }

        //hash (encrypt) our passward using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) { return next(err); }

            //overwrite plain text password with encrypted password
            user.password = hash;
            next(); //go head you can save the model
        })
    })
});

UserSchema.methods.comparePassword =  function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err);}

        callback(null, isMatch);
    })
}

//Create the modal class
const model = mongoose.model('user', UserSchema);

//Export the model
module.exports = model;
