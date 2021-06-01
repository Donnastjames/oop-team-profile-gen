const Employee = require('./Employee');

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school.trim();
  }

  getSchool() {
    console.log('getSchool() returned:', this.school);
    return this.school;
  }

  getRole() {
    console.log('getRole() returned "Intern"');
    return 'Intern';
  }
}

module.exports = Intern;