const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
  it("can be constructed with a name, id, email and github property", () => {
    const engineer = new Engineer("  Laura Ingalls  ", "  2234  ", "  laura.ingalls@email.com   ", "  github.com/lauraingalls ");

    // Verify that the new Engineer has the correct properties
    expect(engineer.name).toEqual("Laura Ingalls");
    expect(engineer.id).toEqual("2234");
    expect(engineer.email).toEqual("laura.ingalls@email.com");
    expect(engineer.github).toEqual("github.com/lauraingalls");
  });

  it("should throw an error for invalid github parameter", () => {
    const cb = () => new Engineer("Jane Doe", "246-9", "jane.doe@gmail.com", null);
    const err = new Error("Cannot read property 'trim' of null");
    expect(cb).toThrowError(err);
  });

  it("getGithub() returns expected Github profile", () => {
    const engineer = new Engineer("Laura Ingalls", "2234", "laura.ingalls@email.com", "lauraingalls");
    expect(engineer.getGithub()).toEqual("lauraingalls");
  });

  it("getRole() returns the string 'Engineer'", () => {
    const engineer = new Engineer("Laura Ingalls", "2234", "laura.ingalls@email.com", "github.com/lauraingalls", "Engineer");
    expect(engineer.getRole()).toEqual("Engineer");
  });
});