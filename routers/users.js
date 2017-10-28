const express = require('express');
const router = express.Router();
const models = require('./../models');
const User = models.User;
const sequelize = models.sequelize;


// ----------------------------------------
// Index
// ----------------------------------------
const onIndex = (req, res) => {
  User.findAll()
    .then(users => {
      res.render('users/index', { users });
    })
    .catch(e => res.status(500).end(e.stack));
};

router.get('/', onIndex);
router.get('/users', onIndex);


// ----------------------------------------
// Show
// ----------------------------------------
router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.render('users/show', { user });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// New
// ----------------------------------------
router.get('/user/new', (req, res) => {
  res.render('users/new');
});


// ----------------------------------------
// Create
// ----------------------------------------
router.post('/users', (req, res) => {
  let userParams = getUserParams(req);

  User.create(userParams)
    .then(user => {
      res.redirect(`users/${ user.id }`);
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// Destroy
// ----------------------------------------
router.delete('/users/:id', (req, res) => {
  User.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      res.redirect('/users');
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// Edit
// ----------------------------------------
router.get('/users/:id/edit', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.render('users/edit', { user });
      } else {
        res.end(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// Update
// ----------------------------------------
router.put('/users/:id', (req, res) => {
  let userParams = getUserParams(req);

  User.update(userParams, {
    where: { id: req.params.id }, limit: 1
  })
    .then(() => {
      res.redirect(`/users/${ req.params.id }`);
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// Functions
// ----------------------------------------
const getUserParams = (req) => {
  let userBody = req.body.user;

  return {
    fname: userBody.fname,
    lname: userBody.lname,
    username: userBody.username,
    email: userBody.email
  };
};

module.exports = router;
