const Employee = require('./Employee');

const usedGithubs = [];

class Engineer extends Employee {
  constructor(name, id, email, github) {
    if (typeof github !== "string" || !github.trim()) {
      throw new Error(`Expected 'github' profile to contain characters, but was: "${github}"`);
    }

    if (usedGithubs.includes(github.trim().toLowerCase())) {
      throw new Error(`This github profile "${github}" has already been used!`);
    }
    super(name, id, email);
    this.github = github.trim();
    usedGithubs.push(github.trim().toLowerCase());
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
