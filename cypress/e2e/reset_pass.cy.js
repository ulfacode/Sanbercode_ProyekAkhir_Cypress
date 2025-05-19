import LoginData from "../fixtures/LoginData.json";
import ResetPassPage from "../support/pages/ResetPassPage";

describe('Reset Password Page Tests', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        ResetPassPage.visit();
    });

    it('Verifikasi elemen halaman reset password', () => {
        ResetPassPage.verifyResetPassPageTitle();
        ResetPassPage.verifyFieldUsername();
        ResetPassPage.verifyButtonCancel();
        ResetPassPage.verifyButtonReset();
    });

    it('Reset password tanpa mengisi username', () => {
        ResetPassPage.resetButton();
        ResetPassPage.verifyUsernameRequiredError();
    });

    it('Reset password dengan username yang valid', () => {
        ResetPassPage.inputUsername(LoginData.validUsername);
        ResetPassPage.resetButton();
        ResetPassPage.verifyResetPasswordSuccess();
    });

    it('Verifikasi Button Cancel', () => {
        ResetPassPage.cancelButton();
        cy.url().should('include', '/auth/login');
    }); 
});