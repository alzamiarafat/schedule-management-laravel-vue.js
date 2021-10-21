const db = require('../db');
// create your model methods here
// ** you may create different model for different db tableconst db = require('./db');
const tableName = 'emails';

const create = async ({ contactId,email }) => {
  const sql = `INSERT INTO ${tableName} VALUES (?,?)`;
  return await db.query(sql, [contactId,email]);
};


module.exports = {
    create,
};