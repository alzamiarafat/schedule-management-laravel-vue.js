const db = require('../db');
// create your model methods here
// ** you may create different model for different db tableconst db = require('./db');
const tableName = 'users';
const idColumn = 'userId';

const register = async ({ username, password }) => {
  const sql = `INSERT INTO ${tableName} VALUES (null, ?,?)`;
  return await db.query(sql, [username, password]);
};

const getUser = async (userId) => {
  const sql = `SELECT * FROM ${tableName} WHERE ${idColumn}=${db.escape(userId)}`;
  const user = await db.query(sql);
  return user.length > 0 ? user[0] : null;
};


module.exports = {
    register,
    getUser
};