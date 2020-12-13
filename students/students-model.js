const db = require('../config/dbConfig');

module.exports = {
    addStudent,
    findStudent,
    findStudentById,
    removeStudent,
    updateStudent,
};

function addStudent(person, teacherId) {
    return db('students')
        .insert({'teacherId': teacherId, ...person}, 'id')
        .then(([id]) => {
            return findStudentById(id);
        });
}

function findStudent() {
    return db('students')
        .orderBy('id');
}

function findStudentById(id) {
    return db('students')
        .where({ id })
        .first();
}

function removeStudent(id) {
    return db('students')
        .where({ id })
        .del();
}

function updateStudent(id, changes) {
    return db('students')
        .where({ id })
        .update(changes)
        .then(() => findStudentById(id));
}