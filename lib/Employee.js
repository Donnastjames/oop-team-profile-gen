class Employee {
  constructor(name, id, email) {
    this.name = name.trim();
    this.id = id.trim();
    this.email = email.trim();
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return 'Employee';
  }
}

module.exports = Employee;