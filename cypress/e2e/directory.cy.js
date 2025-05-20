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

    it('Search employee dengan valid name', () => {
        DirectoryPage.inputSearchEmployeeName(DirectoryData.validEmployeeName); //data nya sering berubah-ubah, jadi terkadang gagal
        DirectoryPage.searchButton();
        DirectoryPage.verifySearchEmployeeNameSuccess(DirectoryData.validEmployeeName);
    });

    it(' Search job title dengan valid job title', () => {
        DirectoryPage.inputJobTitleOpsi(DirectoryData.validJobTitle);//data nya sering berubah-ubah, jadi terkadang gagal
        DirectoryPage.searchButton();
        DirectoryPage.verifySearchJobTitleSuccess(DirectoryData.validJobTitle);
    });

    it('Search lokasi dengan valid location', () => {
        DirectoryPage.inputLocationOpsi(DirectoryData.validLocation);//data nya sering berubah-ubah, jadi terkadang gagal
        DirectoryPage.searchButton();
        DirectoryPage.verifySearchLocationSuccess(DirectoryData.validLocation);
    });

    it('Search data employee dengan data yang tidak valid', () => {
        DirectoryPage.inputSearchEmployeeName(DirectoryData.validEmployeeName);
        DirectoryPage.inputJobTitleOpsi(DirectoryData.validJobTitle);
        DirectoryPage.inputLocationOpsi(DirectoryData.invalidLocation);
        DirectoryPage.searchButton();
        DirectoryPage.verifySearchNotFound();
    });

    it('Verifikasi Reset button mengosongkan semua field input', () => {
        DirectoryPage.inputSearchEmployeeName(DirectoryData.validEmployeeName);
        DirectoryPage.inputJobTitleOpsi(DirectoryData.validJobTitle);
        DirectoryPage.inputLocationOpsi(DirectoryData.validLocation);
        DirectoryPage.resetButton();
        DirectoryPage.verifyResetSearchSuccess();
    });


});