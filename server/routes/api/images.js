const router = require('express').Router();
const Image = require('../../db');

/**     /api/images     **/

// TODO discuss best way to handle these routes
// Github Issue #19

// get image for a challenge
router.get('/challenge/:challengeId', (req, res, next) => {
	const { challengeId } = req.params;
	Image.findAll({
		where: { challengeId },
	})
		.then(image => res.send(image))
		.catch(next);
});

// get a userchallenge image
router.get('/userchallenge/:userchallengeId', (req, res, next) => {
	const { userchallengeId } = req.params;
	Image.findAll({
		where: { userchallengeId }
	})
});

module.exports = router;