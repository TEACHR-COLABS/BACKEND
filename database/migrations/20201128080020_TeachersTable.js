exports.up = function(knex) {
    return knex.schema
    .createTable('teachers', table => {
        table.increments();
        table.string('firstName', 128).notNullable();
        table.string('lastName', 128).notNullable();
        table.string('email', 128).notNullable().unique();
        table.string('password', 128).notNullable();
        table.string('assessmentType', 128).notNullable();
        table.string('assessmentGroup', 128).notNullable();
        table.boolean('profileComplete')
                .defaultTo('false')
                .notNullable();
    })
    .createTable('students', table => {
        table.increments();
        table.integer('teacherId')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('teachers')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        table.string('firstName', 128).notNullable();
        table.string('lastName', 128).notNullable();
        table.integer('studentNumber', 128).notNullable();
        table.string('studentMail', 128).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('teachers')
    .dropTableIfExists('students');
};
