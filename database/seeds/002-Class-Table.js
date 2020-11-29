
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('class').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('class').insert([
        {userID: 1, className:'Class 1', classYear: "2020", classSubject: "Oral" },
        {userID: 1, className:'Class 2', classYear: "2020", classSubject: "Oral" },
        {userID: 2, className:'Class 3', classYear: "2020", classSubject: "Oral" },
      ]);
    });
};
