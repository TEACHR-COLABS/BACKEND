const db = require('../config/dbConfig.js');

module.exports = {
    addUser,
    findUsers,
    findUsersBy,
    findUsersById,
    findClassesByUserId,
    removeUser,
    updateUser,
    // findStudentByUserId
};

async function addUser(user) {
    const [id] = await db('users').insert(user, 'id');

    return findUsersById(id);
}

function findUsers() {
    return db('users')
        .select('id', 'email', 'firstName', 'lastName', 'school')
        .orderBy('id');
}
function findUsersBy(filter) {
    return db('users')
        .where(filter)
        .first();
}
function findUsersById(id) {
    return db('users')
        .where({ id })
        .select('id', 'email', 'firstName', 'lastName', 'school')
        .first();
}

function findClassesByUserId(id) {
    return db('class')
        .where({ userId: id });
}

function removeUser(id) {
    return db('users')
        .where({ id })
        .del();
}

function updateUser(id, changes) {
    return db('users')
        .where({ id })
        .update(changes)
        .then(() => findUsersById(id));
}