describe("Note app", () => {
  beforeEach(() => {
    // TODO: reset database

    cy.visit("http://localhost:3000");
  });

  it("shows login form", () => {
    cy.contains("Log in").click();
  });

  describe("login", () => {
    it("succeeds with correct credentials", () => {
      cy.contains("Log in").click();

      cy.get("#login").type("test1");
      cy.get("#password").type("123");
      cy.contains("Login").click();

      cy.contains("Signed in");
    });

    it("fails with wrong credentials", () => {
      cy.contains("Log in").click();

      cy.get("#login").type("test1");
      cy.get("#password").type("definitely wrong one");
      cy.contains("Login").click();

      cy.contains("Couldn't sign in");
    });
  });

  describe("when logged in", () => {
    beforeEach(() => {
      cy.contains("Log in").click();

      cy.get("#login").type("test1");
      cy.get("#password").type("123");
      cy.contains("Login").click();

      cy.contains("Signed in");
    });

    it("allows user to create a blog", () => {
      cy.get(".show").click();
      cy.get("#title").type("Some title added now");
      cy.get("#url").type("http://localhost:3002/api/blogs/123");
      cy.get("#submit").click();

      cy.contains("Some title");
    });

    it("allows user to like a blog", async () => {
      cy.contains("View").click();
      cy.contains("Like").click();
    });

    it("allows user to delete blogs created by him", () => {
      cy.contains("Some title added now")
        .parent()
        .contains("View")
        .click()
        .then(() => {
          cy.contains("Delete").click();
        });
    });

    it("displays blogs sorted by the number of likes", () => {
      let firstOne = null;
      cy.get(".blog").each((blog) => {
        cy.wrap(blog)
          .contains("View")
          .click()
          .then(() => {
            cy.wrap(blog)
              .contains(/Likes: \d+/)
              .then((likes) => {
                const value = Number(likes.text().split(" ")[1]);

                if (firstOne === null) {
                  firstOne = value;
                }

                expect(value).most(firstOne);
              });
          });
      });
    });
  });
});
