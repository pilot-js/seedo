
// routes

// /api/challenge

get / - get all challenges

// single challenge
post / - create a challenge

get /:id - get single challenge by id

update /:id - updating challenge

delete /:id - delete challenge

// /api/solution

get /challenge/:challengeId - get single challenge solution

// TODO later for admin
post 
update
delete

// /api/user
get / - all users

get /:userId - get one user by id

post / - create user (at sign up)

// TODO later
delete
update

// /api/userchallenge
get /challenge/:challengeId - get user answer for a challenge

post /challenge/:challengeId - create answer for a challenge

update /challenge/:challengeId - update answer for a challenge

delete /challenge/:challengeId - delete answer for a challenge
	- create deleteAnswerImage instance fnc - deletes image associated with their answer


// /api/image

get /challenge/:challengeId - get image for a challenge