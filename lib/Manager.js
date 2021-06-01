const Employee = require('./Employee');

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    if (typeof officeNumber !== "string" && typeof officeNumber !== "number") {
      throw new Error(`Expected 'officeNumber' to contain characters or numbers, but was: ${officeNumber}`);
    }

    if (typeof officeNumber === "string" && !officeNumber.trim()) {
      throw new Error(`officeNumber is invalid: "${officeNumber}"`);
    }

    if (typeof officeNumber === "number" && officeNumber < 0) {
      throw new Error(`officeNumber is invalid: ${officeNumber}`);
    }

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