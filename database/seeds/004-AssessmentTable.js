
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('assessments').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('assessments').insert([
        {classID:1,studentID:1,criteriaID:201,assessmentName:"Composure",comments:"Lonnnnng texttttt thatttt sayyys something",date:"March 15, 2020", countChecks: 1,},
        {classID:1,studentID:2,criteriaID:205,assessmentName:"Coordination",comments:"Lonnnnng texttttt thatttt sayyys something",date:"September 20, 2020", countChecks: 1,},
        {classID:2,studentID:3,criteriaID:207,assessmentName:"Organization",comments:"Lonnnnng texttttt thatttt sayyys something",date:"December 15, 2020", countChecks: 1,}
      ]);
    });
};
