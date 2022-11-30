const { waitForDebugger } = require("inspector");

describe("Starting a session", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/");
  });

  it("should sucessfully start a session if session is there", () => {
    cy.loginFunction("georgeporgy@uni.com");
    cy
      .intercept(
        `http://localhost:8080/session/attendance?_id=6387407e4112b593e350c13a`
      )
      .as("startSession").then;

    cy.get('[data-cy="joinSessionButton"]', { timeout: 5000 })
      .first()
      .should("be.visible")
      .click();

    cy.wait("@startSession").then((response) => {
      expect(response.state).to.equal("Complete");
    });
  });

  it("should not find a session if there are no sessions", () => {
    cy.loginFunction("janekane@uni.com");

    cy.get('[data-cy="joinSessionButton"]').should("not.exist");
  });
});
