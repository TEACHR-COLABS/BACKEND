exports.up = function(knex) {
    return knex.schema.createTable('assessments', table => {
        table.increments();
        table.integer('userID', 128).notNullable();
        table.integer('classID', 128).notNullable();
        table.integer('studentID', 128).notNullable();
        table.integer('criteriaID', 128).notNullable();
        table.string('assessmentName', 128).notNullable();
        table.string('comments').notNullable();
        table.date("date").notNullable();
        table.integer('countChecks', 128).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('assessments');
};
