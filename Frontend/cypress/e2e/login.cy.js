describe("login mocking", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/");
  });

  it("should login with a correct email", () => {
    cy.loginFunction("janekane@uni.com").then((response) => {
      expect(response.response).property("statusCode").to.equal(200);
    });
  });

  it("should not login with an incorrect email", () => {
    cy.loginFunction("janekae@uni.com").then((response) => {
      expect(response.response).property("statusCode").to.equal(401);
    });
  });
});
