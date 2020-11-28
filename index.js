require('dotenv').config();

const server = require('./api/server.js');


//App listening
// eslint-disable-next-line no-undef
server.listen(process.env.PORT || 3000, () => {
    // eslint-disable-next-line no-undef
    console.log("listening on " + (process.env.PORT || 3000));
});