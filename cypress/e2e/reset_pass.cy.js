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

    it.only('Reset password dengan username yang valid', () => {
        ResetPassPage.inputUsername(LoginData.validUsername);
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('resetPassword');
        ResetPassPage.resetButton();
        // Verifikasi bahwa permintaan ke endpoint reset password berhasil
        cy.wait('@resetPassword');
        ResetPassPage.verifyResetPasswordSuccess();
    });

    it('Verifikasi Button Cancel', () => {
        ResetPassPage.cancelButton();
        cy.url().should('include', '/auth/login');
    }); 
});