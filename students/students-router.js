const router = require('express').Router();


const Students = require("../students/students-model");

//get all students
router.get('/', (req, res) => {
    Students.findStudent()
        .then(student => {
            res.status(200).json(student)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'There was an error retrieving the student.' })
        });
});

//get a single student by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Students.findStudentById(id)
    .then(student => {
        res.status(200).json(student)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error retrieving the specified candidate.' })
    });
});

module.exports = router;