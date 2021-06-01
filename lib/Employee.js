// https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
const validEmailRegex = /^\S+@\S+\.\S+$/;

const usedNames = [];
const usedIds = [];
const usedEmails = [];

class Employee {
  constructor(name, id, email) {
    if (typeof name !== "string" || !name.trim()) {
      throw new Error(`Expected parameter 'name' to be a non-empty string, but was: ${name}}`);
    }
  
    if (typeof id !== "number" || isNaN(id) || id < 0) {
      throw new Error(`Expected parameter 'id' to be a non-negative number, but was: ${id}`);
    }

    if (typeof email !== "string" || !validEmailRegex.test(email)) {
      throw new Error(`Expected parameter 'email' to be a valid e-mail address, but was: ${email}`);
    }

    if (usedNames.includes(name.trim().toLowerCase())) {
      throw new Error(`This name "${name}" has already been used!`);
    }

    if (usedIds.includes(id)) {
      throw new Error(`This id=${id} has already been used!`);
    }

    if (usedEmails.includes(email.toLowerCase())) {
      throw new Error(`This e-mail address "${email}" has already been used!`);
    }
  
    this.name = name.trim();
    this.id = id;
    this.email = email;

    // Keep the "used" arrays up to date for next time ...
    usedNames.push(name.trim().toLowerCase());
    usedIds.push(id);
    usedEmails.push(email.toLowerCase());
  }


  getName() {
    console.log(`The employee name is "${this.name}".`);
    return this.name;
  }

  getId() {
    console.log(`The employee ID is "${this.id}".`);
    return this.id;
  }

  getEmail() {
    console.log(`The employee Email is "${this.email}"`);
    return this.email;
  }

  getRole() {
    return 'Employee';
  }
}

module.exports = Employee;