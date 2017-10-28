var models = require('./../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];
    for (var i = 0; i < 20; i++) {
      users.push({
        fname: `Foo${i}`,
        lname: `Bar${i}`,
        username: `Foobar${i}`,
        email: `foobar${i}@example.com`
      });
    }
    return queryInterface.bulkInsert('Users', users);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {}, models.User);
  }
};
