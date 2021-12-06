const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 12;
const secret = 'carctrl-secret';

const controller = {
  register: async (req, res) => {
    let data = req.body;
    let emailExist = false;

    const userRef = db.collection('users');
    const snapshot = await userRef
      .where('email', '==', data.email)
      .get();
    if (!snapshot.empty) {
      emailExist = true;
    };

    if (emailExist) {
      res.send('User already registered.')
    }
    else {
      bcrypt.hash(data.password, saltRounds).then(async (hash) => {
        data.password = hash;
        const user = await db.collection('users').add(data);
        res.send('Succesfull registration');
      });
    }
  },
  
  login: async (req, res) => {
    let data = req.body;
    let emailFound = false;
    const usersRef = db.collection('users');
    const snapshot = await usersRef
      .where('email', '==', data.email)
      .get();
    let response = {};

    if (snapshot.empty) {
      response.message = "No such email address.";
      res.send(response);
    } else {
      emailFound = true;
      snapshot.forEach(doc => {
        bcrypt.compare(
          data.password, 
          doc.data().password)
          .then(async (result) => {
            if (result) {
              let token = jwt.sign({
                email: doc.data().email
              }, secret);

              const user = {
                id: doc.id,
                ...doc.data(),
              }
              response.token = token;
              response.user = user;
              response.message = 'You have the right to access private resources'

              res.send(response);
            }
            else {
              response.message = "Password missmatch";
              res.send(response)
            }
          });
        }
      );
    }
  }
}

module.exports = controller;