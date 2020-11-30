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
        profileComplete: true,
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
// router.delete('/:id', restricted, (req, res) => {
//     const { id } = req.params;
//     Centers.findCenterById(id)
//     .then(center => {
//         Centers.removeCenter(center.id)
//         .then(deleted => {
//             res.status(200).json({removed: center});
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(404).json({ message: 'No center with this ID exists.'})
//         });
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(500).json({ message: 'There was an error deleting the specified center.' })
//     });
// });

//add a new candidate
// router.post('/:id/candidates', restricted, (req, res) => {
//     const newCandidate = req.body;
//     const { id } = req.params;

//     Centers.findCenterById(id)
//     .then(center => {
//         if (center) {
//             //console.log('center to add candidate to:', center);
//             //console.log('candidate to add:', newCandidate);
//             //console.log('center id:', id);
//             Candidates.addCandidate(newCandidate, id)
//             .then(candidate => {
//                 res.status(201).json(candidate);
//             })
//             .catch(error => {
//                 console.log(error);
//                 res.status(500).status({ message: 'There was an error creating a new candidate.' })
//             });
//         } else {
//             res.status(404).json({ message: 'No center with this ID exists.' })
//         }
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(500).json({ message: 'There was an error while creating a new candidate profile.' })
//     });
// });

//update a candidate
// router.put('/:centId/candidates/:candId', restricted, (req, res) => {
//     const centId = req.params.centId;
//     const candId = req.params.candId;
//     const changes = {...req.body}
//     Candidates.findCandidateById(candId)
//     .then(candidate => {
//         console.log(candidate)
//         if (centId == candidate.centerId){
//             Candidates.updateCandidate(candidate.id, changes)
//             .then(updated => {
//                 res.status(200).json(updated);
//             })
//             .catch(error => {
//                 console.log(error);
//                 res.status(500).json({ message: 'There was an error updating this candidate profile.' })
//             })
//         } else {
//             res.status(404).json({ message: 'No candidate with this ID exists at this center.' })
//         }
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(500).json({ message: 'There was an error retrieving the specified candidate.' })
//     });
// });

//delete a candidate
// router.delete('/:centId/candidates/:candId', restricted, (req, res) => {
//     const centId = req.params.centId;
//     const candId = req.params.candId;
//     Candidates.findCandidateById(candId)
//     .then(candidate => {
//         console.log(candidate)
//         if (centId == candidate.centerId){
//             Candidates.removeCandidate(candidate.id)
//             .then(deleted => {
//                 res.status(200).json({removed: candidate});
//             })
//             .catch(error => {
//                 console.log(error);
//                 res.status(404).json({ message: 'No candidate with this ID exists at this center.'});
//             })
//         } else {
//             res.status(404).json({ message: 'You are not authorized to remove this candidate.' }); 
//         }
        
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(500).json({ message: 'There was an error retrieving the specified candidate.' })
//     });
// });



module.exports = router;


