const router = require('express').Router();

const Users = require('../users/usersModel.js');
const Class = require('../classes/classesModel.js');
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

// get users by id, as well as all classes from users
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
    Users.findUsersById(id)
    .then(user => {
        Users.removeUser(user.id)
        // eslint-disable-next-line no-unused-vars
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


// add a new class
router.post('/:id/class', restricted, (req, res) => {
    const newClass = req.body;
    const { id } = req.params;

    Users.findUsersById(id)
    .then(user => {
        if (user) {
            Class.addClass(newClass, id)
            .then(
                teachrClass => {
                    res.status(201).json(teachrClass);
            })
            .catch(error => {
                console.log(error);
                res.status(500).status({ message: 'There was an error creating a new class.' })
            });
        } else {
            res.status(404).json({ message: 'No user with this ID exists.' })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error while creating a new class profile.' })
    });
});

//update a new class
router.put('/:usId/class/:claId', restricted, (req, res) => {
    const usId = req.params.usId;
    const claId = req.params.claId;
    const changes = {...req.body}
    Class.findClassById(claId)
    .then(classData => {
        console.log(classData)
        if (usId == classData.userID){
            Class.updateClass(classData.id, changes)
            .then(updated => {
                res.status(200).json(updated);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: 'There was an error updating this class.' })
            })
        } else {
            res.status(404).json({ message: 'No class with this ID exists with this user.' })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error retrieving the specified class.' })
    });
});

//delete a class
router.delete('/:usId/class/:claId', restricted, (req, res) => {
    const usId = req.params.usId;
    const claId = req.params.claId;
    Class.findClassById(claId)
    .then(classData => {
        console.log(classData)
        if (usId == classData.userID){
            Class.removeClass(classData.id)
            // eslint-disable-next-line no-unused-vars
            .then(deleted => {
                res.status(200).json({removed: classData});
            })
            .catch(error => {
                console.log(error);
                res.status(404).json({ message: 'No class with this ID exists with this center.'});
            })
        } else {
            res.status(404).json({ message: 'You are not authorized to remove this class.' }); 
        }
        
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error retrieving the specified class.' })
    });
});


module.exports = router;


