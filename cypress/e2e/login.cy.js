import LoginPage from "../support/pages/LoginPage";
import LoginData from "../fixtures/LoginData.json";


describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    LoginPage.visit();
  });

  it('Verifikasi elemen halaman login', () => {
    LoginPage.verifyLoginPageTitle();
    LoginPage.verifyFieldUsername();
    LoginPage.verifyFieldPassword();
    LoginPage.verifyButtonLogin();
  });

  it.only('Login dengan username & password yang valid', () => {
    
    LoginPage.inputUsername(LoginData.validUsername);
    LoginPage.inputPassword(LoginData.validPassword);
    cy.intercept('GET', '**/api/v2/dashboard/employees/action-summary').as('login'); //tidak bisa pake base url
    LoginPage.clickLoginButton();
    // Verifikasi bahwa permintaan ke endpoint dashboard berhasil
    cy.wait('@login');
    LoginPage.verifyLoginSuccess();
  });

  it('Login tanpa mengisi username & password', () => {
    LoginPage.clickLoginButton();
    // Verifikasi pesan error untuk username dan password
    LoginPage.verifyUsernameRequiredError()
    LoginPage.verifyPasswordRequiredError()
  });

  it('Login tanpa username, hanya password', () => {
    LoginPage.inputPassword(LoginData.validPassword);
    LoginPage.clickLoginButton();
    LoginPage.verifyUsernameRequiredError();
  });

  it('Login tanpa password, hanya username', () => {
    LoginPage.inputUsername(LoginData.validUsername);
    LoginPage.clickLoginButton();
    LoginPage.verifyPasswordRequiredError();
  });

  it('Login dengan username dan password salah', () => {
    LoginPage.inputUsername(LoginData.invalidUsername);
    LoginPage.inputPassword(LoginData.invalidPassword); 
    LoginPage.clickLoginButton();
    LoginPage.verifyInvalidLogin();
  });

  it('Login dengan username benar, password salah', () => {
    LoginPage.inputUsername(LoginData.validUsername);
    LoginPage.inputPassword(LoginData.invalidPassword); 
    LoginPage.verifyInvalidLogin()
  });

  it('Login dengan password benar, username salah', () => {
    LoginPage.inputUsername(LoginData.invalidUsername);
    LoginPage.inputPassword(LoginData.validPassword); 
    LoginPage.verifyInvalidLogin();
  });
})