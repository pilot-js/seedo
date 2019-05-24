const router = require('express').Router();

router.use('/challenges', require('./challenges'));
router.use('/solutions', require('./solutions'));
router.use('/users', require('./users'));
router.use('/userchallenges', require('./userchallenges'));
router.use('/images', require('./images'));

module.exports = router;
