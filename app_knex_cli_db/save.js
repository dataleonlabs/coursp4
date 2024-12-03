// App.js - Utilisation des opérations CRUD avec Knex

const db = require('./boissonModel');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function main() {
  const boissons = {
    'captain_morgan': { qty: 10, price: 30},
    'barcadi': { qty: 19, price: 10},
    'old_nick': { qty: 5, price: 30},
  }

  for (boisson_name in boissons) {
    await db.createBoisson(boisson_name, boissons[boisson_name].qty, boissons[boisson_name].price);
  }

  // Read
  const getAllBoissons = await db.getAllBoissons();
  console.log('Tous les boissons :', getAllBoissons);
}

main().catch(err => console.error(err));
