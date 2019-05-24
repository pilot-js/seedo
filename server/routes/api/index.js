const router = require('express').Router();

router.use('/challenges', require('./challenges'));
// router.use('/solutions', require('./solution'));
// router.use('/users', require('./user'));
// router.use('/userchallenges', require('./userchallenge'));
// router.use('/images', require('./image'));

module.exports = router;