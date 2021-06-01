const Employee = require('./Employee');

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getOfficeNumber() {
    console.log('officeNumber() returned:', this.officeNumber);
    return this.officeNumber;
  }

  getRole() {
    console.log('getRole() returned "Manager"');
    return 'Manager';
  }
}

module.exports = Manager;