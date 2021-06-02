const Manager = require("../lib/Manager");

describe("Manager", () => {
  it("can be constructed with a name, id, email and officeNumber property", () => {
    const manager = new Manager("  Gina Smith  ", "  B-88-99a  ", "  gina.smith@email.com   ", "12");

    // Verify that the Manager has the correct properties
    expect(manager.name).toEqual("Gina Smith");
    expect(manager.id).toEqual("B-88-99a");
    expect(manager.email).toEqual("gina.smith@email.com");
    expect(manager.officeNumber).toEqual("12");
  });

  it("should throw an error for invalid email parameter", () => {
    const cb = () => new Manager("Gina Smith", "B-88-99a", null, "12");
    const err = new Error("Cannot read property 'trim' of null");
    expect(cb).toThrowError(err);
  });

  it("getOfficeNumber() returns expected office number", () => {
    const manager = new Manager("Gina Smith", "B-88-99a", "gina.smith@email.com", "12");
    expect(manager.getOfficeNumber()).toEqual("12");
  });

  it("getRole() returns expected string Manager", () => {
    const manager = new Manager("Gina Smith", "B-88-99a", "gina.smith@email.com", "12", "Manager");
    expect(manager.getRole()).toEqual("Manager");
  });

});