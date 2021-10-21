const express = require('express');
const router = express.Router();
const { validateRequest } = require('./validator');
const Response = require('./utils/response');
const userModel = require('./models/userModel');
const emailModel = require('./models/emailModel');
const contactModel = require('./models/contactModel');

// require your models here


// sample post method
// router.post('/', async (req, res) => {
//   const response = new Response(res);
//   try {
//     validate request to check user input errors
//     call model methods
//     send response to client
//   } catch (error) {
//     send error response to client
//   }
// });


// const express = require('express');
// const router = express.Router();
// const model = require('../models/customer.model');
// const { validateRequest } = require('./customer.validator');
// const Response = require('../utils/response');
// const logger = require('../utils/logger');

router.get('/', async (req, res) => {
  return res.json(563654);
});

// router.get('/:customerId', async (req, res) => {
//   logger.info(`CUSTOMER-CONTROLLER::GET`);
//   const response = new Response(res);
//   try {
//     const id = req.params.customerId;
//     const customer = await model.get(id);
//     if(!customer) return response.notFound({ message: 'Customer not found' });
//     return response.ok(customer);
//   } catch (error) {
//     logger.error(`CUSTOMER-CONTROLLER::GET`);
//     const message = error.message ? error.message : 'Server error';
//     response.internalServerError({ message });
//   }
// });

router.post('/register', async (req, res) => {
  const response = new Response(res);
  try {
    const { data, error } = validateRequest(req, 'userCreate');
    if(error) return response.badRequest(error);

    const { username, password } = data;

    await userModel.register({ username, password });
    const messageSuccess = {
        "success": true,
        "message": "User registered successfully"
    }
    
    return response.created(messageSuccess);
  } catch (error) {
    const message = error.message ? error.message : 'Server error';
    response.internalServerError({ message });
  }
});

router.post('/contacts', async (req, res) => {
  const response = new Response(res);
  try {
      const { data, error } = validateRequest(req, 'contactsCreate');
      if(error) return response.badRequest(error);

      const { name, nick, dob,userId } = data;

      const user = await userModel.getUser(userId);
      if(!user) return response.notFound({ message: 'User not found' });

      await contactModel.create({ name, nick, dob, userId });
      const messageSuccess = {
          "success": true,
          "message": "Contact added successfully"
      }
  
      return response.created(messageSuccess);
  } catch (error) {
    const message = error.message ? error.message : 'Server error';
    response.internalServerError({ message });
  }
});

router.post('/contacts/emails', async (req, res) => {
  const response = new Response(res);
  try {
      const { data, error } = validateRequest(req, 'emailCreate');
      if(error) return response.badRequest(error);

      const { contactId,email } = data;

      const contact = await contactModel.getContact(contactId);
      if(!contact) return response.notFound({ message: 'Contact not found' });

      await emailModel.create({ contactId,email });
      const messageSuccess = {
          "success": true,
          "message": "Email added successfully"
      }
  
      return response.created(messageSuccess);
  } catch (error) {
    const message = error.message ? error.message : 'Server error';
    response.internalServerError({ message });
  }
});


router.post('/contacts/search', async (req, res) => {
  const response = new Response(res);
  try {
      const { data, error } = validateRequest(req, 'contactsSearch');
      if(error) return response.badRequest(error);

      const { userId,search } = data;

      const contactDetails = await contactModel.getContactSearch({userId, search});
      if(!contactDetails) return response.notFound({ message: 'Contact not found' });
  
      return response.created(contactDetails);
  } catch (error) {
    const message = error.message ? error.message : 'Server error';
    response.internalServerError({ message });
  }
});

// router.put('/:customerId', async (req, res) => {
//   logger.info(`CUSTOMER-CONTROLLER::UPDATE`);
//   const response = new Response(res);
//   try {
//     const { data, error } = validateRequest(req, 'update');
//     if(error) return response.badRequest(error);

//     const id = req.params.customerId;
//     const customer = await model.get(id);
//     if(!customer) return response.notFound({ message: 'Customer not found' });

//     const payload = { ...data };
//     await model.update(payload, id);
//     return response.ok({ message: 'Record successfully updated' });
//   } catch (error) {
//     logger.error(`CUSTOMER-CONTROLLER::UPDATE`);
//     const message = error.message ? error.message : 'Server error';
//     response.internalServerError({ message });
//   }
// });

// router.delete('/:customerId', async (req, res) => {
//   logger.info(`CUSTOMER-CONTROLLER::DELETE`);
//   const response = new Response(res);
//   try {
//     const id = req.params.customerId;
//     const customer = await model.get(id);
//     if(!customer) return response.notFound({ message: 'Customer not found' });

//     await model.remove(id);
//     return response.noContent();
//   } catch (error) {
//     logger.error(`CUSTOMER-CONTROLLER::DELETE`);
//     const message = error.message ? error.message : 'Server error';
//     response.internalServerError({ message });
//   }
// });


module.exports = router;