describe("Halaman Utama", () => {
  it("berhasil dimuat", () => {
    cy.visit("http://localhost:5174/");
  });

  beforeEach(() => {
    cy.visit("http://localhost:5174/");
  });

  it("memuat judul", () => {
    cy.contains("h1", "Hello Jayjay Cypress Student");
  });

  it("memuat component form student", () => {
    cy.get(".name-input").should("exist");
    cy.get(".email-input").should("exist");
    cy.get(".phone-input").should("exist");
  });

  it("melakukan test input form student", () => {
    cy.get(".name-input").type("Test");
    cy.get(".name-input").should("have.value", "Test");
    cy.get(".email-input").type("Mencoba");
    cy.get(".email-input").should("have.value", "Mencoba");
    cy.get(".phone-input").type("0123456");
    cy.get(".phone-input").should("have.value", "0123456");
  });

  it("melakukan post data", () => {
    cy.intercept("POST", "https://jsonplaceholder.typicode.com/users").as(
      "postUser"
    );
    cy.get(".name-input").type("Test");
    cy.get(".email-input").type("Mencoba");
    cy.get(".phone-input").type("0123456");
    cy.get(".post-user-button").click();
    cy.wait("@postUser");
    cy.get(".success-response").should("exist");
  });

  it("melakukan fetch data user", () => {
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/users").as(
      "fetchUser"
    );
    cy.get(".fetch-user-button").click();
    cy.wait("@fetchUser");
    cy.get('[class^="user-"]').should("exist");
  });
});
