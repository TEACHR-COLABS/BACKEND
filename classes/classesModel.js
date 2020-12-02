const db = require('../config/dbConfig');

module.exports = {
    addClass,
    findClass,
    findClassById,
    removeClass,
    updateClass,
};

function addClass(person, userId) {
    return db('class')
        .insert({'userId': userId, ...person}, 'id')
        .then(([id]) => {
            return findClassById(id);
        });
}

function findClass() {
    return db('class')
        .orderBy('id');
}

function findClassById(id) {
    return db('class')
        .where({ id })
        .first();
}

function removeClass(id) {
    return db('class')
        .where({ id })
        .del();
}

function updateClass(id, changes) {
    return db('class')
        .where({ id })
        .update(changes)
        .then(() => findClassById(id));
}