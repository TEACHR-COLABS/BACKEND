
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {firstName: "Femi", lastName: "Oluwatola", email: 'oluwa@oluwa.com', password:"lalakukulala", school:"EBHS"},
        {firstName: "Blessing", lastName: "Laz", email: 'falz@falz.com', password:"12345abcde", school:"Loyola"},
        {firstName: "Olu", lastName: "Mide", email: 'ble@ble.com', password:"bam123", school:"Corona"}
      ]);
    });
};
