const conn = require('./conn');



const syncAndSeed = () => {
	return conn.sync({ force: true })

};