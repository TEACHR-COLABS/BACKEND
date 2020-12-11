
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('teachers').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('teachers').insert([
        {id: 1, firstName: "First", lastName: "Teacher", email: 'first@first.com', password:"first123abc$", assessmentType:"Round Table Assessment", assessmentGroup:"Grade 11 English, Group 1", profileComplete: true,},
        {id: 2, firstName: "Blessing", lastName: "Laz", email: 'second@second.com', password:"second123abc$", assessmentType:"Round Table Assessment", assessmentGroup:"Grade 11 English, Group 1", profileComplete: true,},
        {id: 3, firstName: "Olu", lastName: "Mide", email: 'third@third.com', password:"third123abc$", assessmentType:"Round Table Assessment", assessmentGroup:"Grade 11 English, Group 1", profileComplete: true,}
      ]);
    });
};
