// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createBoisson(name, quantity, price) {
  return await knex('boissons').insert({ name, quantity, price });
}

// Read
async function getAllBoissons() {
  return await knex.select().from('boissons');
}

async function getBoisonById(id) {
  return await knex('boissons').where({ id }).first();
}

// Update
async function updateBoisson(id, quantity) {
  return await knex('boissons').where({ id }).update({ quantity });
}

// Delete
async function deletBoisson(id) {
  return await knex('boissons').where({ id }).del();
}

module.exports = {
  createBoisson,
  getAllBoissons,
  getBoisonById,
  updateBoisson,
  deletBoisson
};

// npm install knex sqlite3