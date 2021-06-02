const Employee = require("../lib/Employee");

describe("Employee", () => {
  it("can be constructed with a name, id and email property", () => {
    const employee = new Employee("  David Smith  ", "  99-A  ", "  davidsmith@email.com   ");

    // Verify that the new Employee has the correct properties
    expect(employee.name).toEqual("David Smith");
    expect(employee.id).toEqual("99-A");
    expect(employee.email).toEqual("davidsmith@email.com");
  });

  it("should throw an error for invalid name parameter", () => {
    const cb = () => new Employee(undefined, "88-B", "john.doe@gmail.com");
    const err = new Error("Cannot read property 'trim' of undefined");
    expect(cb).toThrowError(err);
  });
});