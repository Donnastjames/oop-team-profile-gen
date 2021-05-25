class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }


  getName() {
    console.log(`The employee name is ${this.name}.`);
  }

  getId() {
    console.log(`The employee ID is ${this.id}.`);
  }

  getRole() {
    return Employee;
  }
}

module.exports = Employee;