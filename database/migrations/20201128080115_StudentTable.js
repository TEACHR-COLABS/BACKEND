exports.up = function(knex) {
    return knex.schema.createTable('students', table => {
        table.increments();
        table.integer('userID', 128).notNullable();
        table.integer('classID', 128).notNullable();
        table.string('firstName', 128).notNullable();
        table.string('lastName', 128).notNullable();
        table.integer('studentNumber', 128).notNullable();
        table.string('studentMail', 128).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('students');
};
