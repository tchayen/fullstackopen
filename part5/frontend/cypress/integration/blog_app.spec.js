describe("Note app", () => {
  beforeEach(() => {
    // TODO: reset database

    cy.visit("http://localhost:3000");
  });

  it("shows login form", () => {
    // TODO
  });

  describe("login", () => {
    it("succeeds with correct credentials", () => {
      cy.contains("Log in").click();

      cy.get("#login").type("test1");
      cy.get("#password").type("123");
      cy.contains("Login").click();
    });

    it("fails with wrong credentials", () => {
      // ...
    });
  });

  describe("when logged in", () => {
    beforeEach(() => {
      // TODO: sign in
    });

    it("allows user to create a blog", () => {
      // TODO
    });

    it("allows user to like a blog", () => {
      // TODO
    });

    it("allows user to delete blogs created by him", () => {
      // TODO
    });

    it("displays blogs sorted by the number of likes", () => {
      // TODO
    });
  });
});
