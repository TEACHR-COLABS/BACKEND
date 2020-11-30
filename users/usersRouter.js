const router = require('express').Router();

const Users = require('../users/usersModel.js');
// const Candidates = require('../candidates/candidates-model.js');
// const restricted = require('../auth/auth-middleware.js');

//PUBLIC OPERATIONS
router.get('/', (req, res) => {
    Users.findUsers()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error retrieving the teacher.' })
    });
});




module.exports = router;


