const Intern = require("../lib/Intern");

describe("Intern", () => {
  it("can be constructed with a name, id, email and school property", () => {
    const intern = new Intern("  Andrew Doe  ", "  22224   ", "  andrewdoe@email.com   ", " University of Washington    ");

    // Verify that the Intern has the correct properties
    expect(intern.name).toEqual("Andrew Doe");
    expect(intern.id).toEqual("22224");
    expect(intern.email).toEqual("andrewdoe@email.com");
    expect(intern.school).toEqual("University of Washington");
  });

  it("should throw an error for invalid school parameter", () => {
    const cb = () => new Intern("Andrew Doe", "22224", "andrewdoe@email.com", undefined);
    const err = new Error("Cannot read property 'trim' of undefined");
    expect(cb).toThrowError(err);
  });

  it("getSchool() returns expected string school", () => {
    const intern = new Intern("Andrew Doe", "22224", "andrewdoe@email.com", "University of Washington");
    expect(intern.getSchool()).toEqual("University of Washington");
  });

  it("getRole() returns expected string 'Intern'", () => {
    const intern = new Intern("Andrew Doe", "22224", "andrewdoe@email.com", "University of Washington", "Intern");
    expect(intern.getRole()).toEqual("Intern");
  });
});