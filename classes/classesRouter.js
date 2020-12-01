const router = require('express').Router();

const Classes = require('../classes/classesModel');

//get all candidates
router.get('/', (req, res) => {
    Classes.findClasses()
        .then(teachrClass => {
            res.status(200).json(teachrClass)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'There was an error retrieving the class.' })
        });
});

//get a single candidate by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Classes.findClassById(id)
    .then(teachrClass => {
        res.status(200).json(teachrClass)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error retrieving the specified class.' })
    });
});

module.exports = router;