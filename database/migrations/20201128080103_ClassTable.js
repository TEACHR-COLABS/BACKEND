exports.up = function(knex) {
    return knex.schema.createTable('class', table => {
        table.increments();
        table.integer('userID', 128).notNullable();
        table.string('className', 128).notNullable();
        table.string('classYear', 128).notNullable();
        table.string('classSubject', 128).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('class');
};
