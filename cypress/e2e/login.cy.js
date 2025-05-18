import LoginPage from "../support/pages/LoginPage";


describe('Login Page Tests', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('Verifikasi elemen halaman login', () => {
    LoginPage.getLoginPageTitle().should('contain', 'Login');
    LoginPage.getUsernameField().should('be.visible');
    LoginPage.getPasswordField().should('be.visible');
    LoginPage.getLoginButton().should('be.visible');
  });

  it('Login dengan username & password yang valid', () => {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('loginRequest');

    LoginPage.login('Admin', 'admin123');
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/dashboard');
  });

  it('Login tanpa mengisi username & password', () => {
    LoginPage.getLoginButton().click();
    LoginPage.getErrorMessage_1().should('contain', 'Required');
    LoginPage.getErrorMessage_2().should('contain', 'Required');
  });

  it('Login tanpa username, hanya password', () => {
    LoginPage.getPasswordField().type('admin123');
    LoginPage.getLoginButton().click();
    LoginPage.getErrorMessage_1().should('contain', 'Required');
  });

  it('Login tanpa password, hanya username', () => {
    LoginPage.getUsernameField().type('Admin');
    LoginPage.getLoginButton().click();
    LoginPage.getErrorMessage_2().should('contain', 'Required');
  });

  it('Login dengan username dan password salah', () => {
    LoginPage.login('salahuser', 'salahpass');
    LoginPage.getErrorMessage_3().should('contain', 'Invalid credentials');
  });

  it('Login dengan username benar, password salah', () => {
    LoginPage.login('Admin', 'salahpass');
    LoginPage.getErrorMessage_3().should('contain', 'Invalid credentials');
  });

  it('Login dengan password benar, username salah', () => {
    LoginPage.login('salahuser', 'admin123');
    LoginPage.getErrorMessage_3().should('contain', 'Invalid credentials');
  });
})