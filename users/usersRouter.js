const router = require('express').Router();

const Users = require('../users/usersModel.js');
// const Candidates = require('../candidates/candidates-model.js');
const restricted = require('../auth/auth-middleware.js');

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

// get users by id, as well as all classes from center
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Users.findUsersById (id)
    .then(user => {
        const id = user.id;
        Users.findClassesByUserId(id)
        .then(classes => {
            res.status(200).json({user, classes})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'There was an error retrieving the classes.' })
        });
    })
    .catch(error => {
        console.log(error);
        res.status(404).json({ message: 'No teacher with this ID exists.' })
    });
});

//AUTH OPERATIONS
// update a user
router.put('/:id/profile', restricted, (req, res) => {
    const { id } = req.params;
    const changes = {
        ...req.body
    }
    Users.updateUser(id, changes)
        .then(updated => {
            //console.log(updated);
            if (updated) {
                res.status(200).json(updated)
            } else {
                res.status(404).json({ message: 'No user with this ID exists.' })
            }  
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'There was an error updating the specified user.' })
        });
});

//delete a center
router.delete('/:id', restricted, (req, res) => {
    const { id } = req.params;
    Users.findUserById(id)
    .then(user => {
        Users.removeUser(user.id)
        .then(deleted => {
            res.status(200).json({removed: user});
        })
        .catch(error => {
            console.log(error);
            res.status(404).json({ message: 'No user with this ID exists.'})
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error deleting the specified center.' })
    });
});




module.exports = router;


