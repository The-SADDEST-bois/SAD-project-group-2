describe("View Attendance", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/");
  });

  it("should find the attendance indicators", () => {
    cy.loginFunction("georgeporgy@uni.com");

    cy.get('[data-cy="joinSessionButton"]', { timeout: 5000 })
      .first()
      .should("be.visible")
      .click();

    cy.get('[data-cy="attendanceIndicator"]', { timeout: 5000 })
      .first()
      .should("be.visible");
  });
});
