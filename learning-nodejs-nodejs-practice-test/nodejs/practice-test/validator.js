const { validate } = require('./utils/request-validator');

const rules = {
  // create your validation rules here
  userCreate: {
    username: { type: 'string', empty: false, unique: true},
    password: { type: 'string', empty: false },
  },
  contactsCreate: {
    name: { type: 'string', empty: false, unique: true},
    nick: { type: 'string', empty: false, optional: true },
    dob: { type: 'string', empty: false, optional: true, pattern: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/ },
    userId: { type: 'number', empty: false },
  },
  emailCreate: {
    email: { type: 'string', empty: false },
    contactId: { type: 'number', empty: false },
  },
  contactsSearch: {
    userId: { type: 'number', empty: false },
    search: { type: 'string', optional: true },
  },
};

const validateRequest = (req, ruleName) => {
  const rule = rules[ruleName];
  return validate(req, rule);
};

module.exports = {
  validateRequest,
};