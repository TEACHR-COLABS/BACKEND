const router = require('express').Router();

const Teachers = require('./teachers-model');
const Students = require('../students/students-model');
// const Students = require("../students/studentsModel.js");
const restricted = require('../auth/auth-middleware.js');

//PUBLIC OPERATIONS
router.get('/', (req, res) => {
    Teachers.findTeachers()
    .then(teachers => {
        res.status(200).json(teachers)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error retrieving the teacher.' })
    });
});

// get users by id, as well as all students from teachers
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Teachers.findTeachersById (id)
    .then(teacher => {
        const id = teacher.id;
        Teachers.findStudentsByTeacherId(id)
        .then(students => {
            res.status(200).json({teacher, students})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'There was an error retrieving the students.' })
        });
        // Users.findStudentByUserId(id)
        // .then(studs => {
        //     res.status(200).json({user, studs})
        // })
        // .catch(error => {
        //     console.log(error);
        //     res.status(500).json({ message: 'There was an error retrieving the students.' })
        // });

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
    Teachers.updateTeacher(id, changes)
        .then(updated => {
            //console.log(updated);
            if (updated) {
                res.status(200).json(updated)
            } else {
                res.status(404).json({ message: 'No teacher with this ID exists.' })
            }  
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'There was an error updating the specified user.' })
        });
});

//delete a teacher
router.delete('/:id', restricted, (req, res) => {
    const { id } = req.params;
    Teachers.findUsersById(id)
    .then(teacher => {
        Teachers.removeTeacher(teacher.id)
        // eslint-disable-next-line no-unused-vars
        .then(deleted => {
            res.status(200).json({removed: teacher});
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


// add a new student
router.post('/:id/students', restricted, (req, res) => {
    const newStudent = req.body;
    const { id } = req.params;

    Teachers.findTeachersById(id)
    .then(teacher => {
        if (teacher) {
            Students.addStudent(newStudent, id)
            .then(
                student => {
                    res.status(201).json(student);
            })
            .catch(error => {
                console.log(error);
                res.status(500).status({ message: 'There was an error creating a new student.' })
            });
        } else {
            res.status(404).json({ message: 'No teacher with this ID exists.' })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error while creating a new class student.' })
    });
});

//update a new student
router.put('/:tchId/students/:studId', restricted, (req, res) => {
    const tchId = req.params.tchId;
    const studId = req.params.studId;
    const changes = {...req.body}
    Students.findStudentById(studId)
    .then(student => {
        console.log(student)
        if (tchId === student.teacherId){
            Students.updateStudent(student.id, changes)
            .then(updated => {
                res.status(200).json(updated);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: 'There was an error updating this student.' })
            })
        } else {
            res.status(404).json({ message: 'No student with this ID exists with this teacher.' })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error retrieving the specified student.' })
    });
});

//delete a class
router.delete('/:tchId/class/:studId', restricted, (req, res) => {
    const tchId = req.params.tchId;
    const studId = req.params.studId;
    Students.findStudentById(studId)
    .then(student => {
        console.log(student)
        if (tchId === student.teacherId){
            Students.removeStudent(student.id)
            // eslint-disable-next-line no-unused-vars
            .then(deleted => {
                res.status(200).json({removed: student});
            })
            .catch(error => {
                console.log(error);
                res.status(404).json({ message: 'No student with this ID exists with this teacher.'});
            })
        } else {
            res.status(404).json({ message: 'You are not authorized to remove this student.' }); 
        }
        
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error retrieving the specified class.' })
    });
});


module.exports = router;


