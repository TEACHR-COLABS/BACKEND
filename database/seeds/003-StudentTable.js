
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {userID: 1,firstName:"Peter",lastName:"Pan",studentNumber: 95000007,studentMail:"student@student.com"},
        {userID: 2,firstName:"Peter",lastName:"Parker",studentNumber: 2093,studentMail:"student2@student2.com"},
        {userID: 3,firstName:"Clark",lastName:"Kent",studentNumber: 5002,studentMail:"student3@student3.com"}
      ]);
    });
};
