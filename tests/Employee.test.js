const Employee = require("../lib/Employee");

describe("Employee", () => {
  it("can be constructed with a name, id and email property", () => {
    const employee = new Employee("  David Smith  ", "  99-A  ", "  davidsmith@email.com   ");

    // Verify that the new Employee has the correct properties
    expect(employee.name).toEqual("David Smith");
    expect(employee.id).toEqual("99-A");
    expect(employee.email).toEqual("davidsmith@email.com");
  });

  it("constructor should throw an error for invalid name parameter", () => {
    const cb = () => new Employee(undefined, "88-B", "john.doe@gmail.com");
    const err = new Error("Cannot read property 'trim' of undefined");
    expect(cb).toThrowError(err);
  });

  it("getName() returns the expected name", () => {
    const employee = new Employee("David Smith", "99-A", "davidsmith@email.com");
    expect(employee.getName()).toEqual("David Smith");
  });

  it("getId() returns the expected id", () => {
    const employee = new Employee("David Smith", "99-A", "davidsmith@email.com");
    expect(employee.getId()).toEqual("99-A");
  });

  it("getEmail() returns the expected email address", () => {
    const employee = new Employee("David Smith", "99-A", "davidsmith@email.com");
    expect(employee.getEmail()).toEqual("davidsmith@email.com");
  });

  it("getRole() returns expected string 'Employee'", () => {
    const employee = new Employee("David Smith", "99-A", "davidsmith@email.com");
    expect(employee.getRole()).toEqual("Employee");
  });
});