const knex = require('knex');

const knexConfig = require('../knexfile');

const environment = 'development'

// process.env.NODE_ENV || 'development'

module.exports = knex(knexConfig[environment]);