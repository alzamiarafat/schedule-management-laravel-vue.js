const db = require('../db');
// create your model methods here
// ** you may create different model for different db tableconst db = require('./db');
const tableName = 'contacts';
const idColumn = 'contactId';

const create = async ({ name, nick, dob, userId }) => {
  const sql = `INSERT INTO ${tableName} VALUES (null, ?,?,?,?)`;
  return await db.query(sql, [name, nick, dob, userId]);
};

const getContact = async (contactId) => {
  const sql = `SELECT * FROM ${tableName} WHERE ${idColumn}=${db.escape(contactId)}`;
  const contact = await db.query(sql);
  return contact.length > 0 ? contact[0] : null;
};

const getContactSearch = async ({userId, search}) => {
  // SELECT * FROM `contacts` WHERE name LIKE '%a%' OR nick LIKE '%s%'
  const sql = `SELECT * FROM ${tableName} WHERE name LIKE '%${search}%' OR nick LIKE '%${search}%'`;
  const contactDetails = await db.query(sql);
  return contactDetails.length > 0 ? contactDetails : null;
};


module.exports = {
    create,
    getContact,
    getContactSearch
};