const router = require('express').Router();

router.use('/challenges', require('./challenges'));
router.use('/solutions', require('./solutions'));
router.use('/users', require('./users'));
router.use('/userchallenges', require('./userchallenges'));

module.exports = router;
