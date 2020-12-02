const router = require('express').Router();


const Students = require("../students/studentsModel");

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