const router = require('express').Router();
const challenges = require('./challenges');
const solutions = require('./solutions');
const users = require('./users');
const userchallenges = require('./userchallenges');
const comments = require('./comments');
const images = require('./images');

router.use('/challenges', challenges);
router.use('/solutions', solutions);
router.use('/users', users);
router.use('/userchallenges', userchallenges);
router.use('/comments', comments);
router.use('/images', images);

module.exports = router;
