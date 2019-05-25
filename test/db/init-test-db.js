const db = require('../../server/db/conn');

db.sync({ force: true });
