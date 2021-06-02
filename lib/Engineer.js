const Employee = require('./Employee');

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github.trim();

    if (!this.github.includes('/')) {
      // If there's no '/', assume only the github profile name was supplied ...
      this.github = `https://github.com/${this.github}`;
    }
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
