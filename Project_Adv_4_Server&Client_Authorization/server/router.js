const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const reuireSignin = passport.authenticate('local', {session: false});

module.exports = function(app) {
    /*app.get('/', function(req, res, next) {
        res.send(['waterbottle', 'phone', 'paper'])
    })*/
    app.get('/', requireAuth, function (req, res)  {
      res.send({ message: 'Super secret code ABC123' });
    });
    app.use('/signin', reuireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);

}