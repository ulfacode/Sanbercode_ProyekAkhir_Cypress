import DirectoryPage from "../support/pages/DirectoryPage";
import DirectoryData from "../fixtures/DirectoryData.json";
import LoginData from "../fixtures/LoginData.json";
import LoginPage from "../support/pages/LoginPage";

describe('Directory Page Tests', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        LoginPage.visit();
        LoginPage.inputUsername(LoginData.validUsername);
        LoginPage.inputPassword(LoginData.validPassword);
        cy.intercept('GET', '**/api/v2/dashboard/employees/action-summary').as('login'); //tidak bisa pake base url
        LoginPage.clickLoginButton();
        cy.wait('@login');
        DirectoryPage.visit();
        cy.intercept('GET', '**/api/v2/directory/employees?limit=14&offset=0').as('directory');
        cy.wait('@directory').its('response.statusCode').should('eq', 200);
    });

    it('Verifikasi elemen halaman directory', () => {
        DirectoryPage.verifyDirectoryPageTitle();
        DirectoryPage.verifySearchBoxEmployee();
        DirectoryPage.verifyJobTitleOpsi();
        DirectoryPage.verifyLocationOpsi();        
        DirectoryPage.verifyResetButton();
        DirectoryPage.verifySearchButton();
    });

    it('Verifikasi search employee', () => {
        DirectoryPage.inputSearchEmployeeName(DirectoryData.validEmployeeName);
        cy.intercept('GET', '**/web/index.php/api/v2/directory/employees?limit=14&offset=0&empNumber=69').as('search');
        DirectoryPage.searchButton();
        cy.wait('@search').its('response.statusCode').should('eq', 200);
        DirectoryPage.verifySearchEmployeeNameSuccess(DirectoryData.validEmployeeName);
    });



});