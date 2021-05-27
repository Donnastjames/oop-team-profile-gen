const Employee = require('./Employee');

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }

  getGithub() {
    console.log('getGitHub() returned:', this.github);
    return this.github;
  }

  getRole() {
    console.log('getRole() returned "Engineer"');
    return 'Engineer';
  }
}

module.exports = Engineer;
