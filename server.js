const express = require('express');

const server = express();

//ROUTES
server.get('/', (req,res) => {
    res.send('We are on home')
});


//App listening
// eslint-disable-next-line no-undef
server.listen(process.env.PORT || 3000, () => {
    // eslint-disable-next-line no-undef
    console.log("listening on " + (process.env.PORT || 3000));
});