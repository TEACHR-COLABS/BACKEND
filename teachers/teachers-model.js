const db = require('../config/dbConfig.js');

module.exports = {
    addTeacher,
    findTeachers,
    findCompleteTeachers,
    findTeachersBy,
    findTeachersById,
    findStudentsByTeacherId,
    removeTeacher,
    updateTeacher,
    // findStudentByTeacherId
};

async function addTeacher(teacher) {
    const [id] = await db('teachers').insert(teacher, 'id');

    return findTeachersById(id);
}

function findTeachers() {
    return db('teachers')
        .select('id', 'email', 'firstName', 'lastName', 'assessmentType', 'assessmentGroup', 'profileComplete')
        .orderBy('id');
}

function findCompleteTeachers() {
    return db('centers')
    .where('profileComplete', true)
    .select('id', 'email', 'firstName', 'lastName', 'assessmentType', 'assessmentGroup', 'profileComplete')
    .orderBy('id');
}
function findTeachersBy(filter) {
    return db('teachers')
        .where(filter)
        .first();
}
function findTeachersById(id) {
    return db('teachers')
        .where({ id })
        .select('id', 'email', 'firstName', 'lastName', 'assessmentType', 'assessmentGroup', 'profileComplete')
        .first();
}

function findStudentsByTeacherId(id) {
    return db('students')
        .where({ teacherId: id });
}

function removeTeacher(id) {
    return db('users')
        .where({ id })
        .del();
}

function updateTeacher(id, changes) {
    return db('teachers')
        .where({ id })
        .update(changes)
        .then(() => findTeachersById(id));
}