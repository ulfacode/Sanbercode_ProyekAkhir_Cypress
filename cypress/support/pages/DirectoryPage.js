class DirectoryPage {
    visit(){
        cy.visit('/directory/viewDirectory');
    };

    getSearchEmployeeName(){
        return cy.get('.oxd-autocomplete-text-input > input');
    };

    getJobTitleOpsi(){
        return cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text');
    }  
    
    getLocationOpsi(){
        return cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text');
    }  
    
    getResetButton(){   
        return cy.get('.oxd-button--ghost');
    }

    getSearchButton(){  
        return cy.get('.oxd-button--secondary');
    }

    verifyDirectoryPageTitle(){
        cy.get('.oxd-text--h5').should('contain', 'Directory');
    };

    verifySearchBoxEmployee(){
        this.getSearchEmployeeName().should('be.visible');
    };

    verifyJobTitleOpsi(){
        this.getJobTitleOpsi().should('be.visible');
    }   

    verifyLocationOpsi(){
        this.getLocationOpsi().should('be.visible');
    }
    
    verifyResetButton(){
        this.getResetButton().should('be.visible');
    }

    verifySearchButton(){
        this.getSearchButton().should('be.visible');
    }

    inputSearchEmployeeName(name){
        this.getSearchEmployeeName().clear().type(name);
        cy.get('.oxd-autocomplete-option').contains(name).click();
    }   

    inputJobTitleOpsi(jobTitle){
        this.getJobTitleOpsi().click();
        cy.get('.oxd-select-dropdown').contains(jobTitle).click();
    }

    inputLocationOpsi(location){
        this.getLocationOpsi().click();
        cy.get('.oxd-select-dropdown').contains(location).click();
    }

    resetButton(){
        this.getResetButton().click();
    }

    searchButton(){
        this.getSearchButton().click();
    }

    verifySearchEmployeeNameSuccess(name){
        cy.get('.orangehrm-container').should('contain', name);
    }

    verifySearchJobTitleOpsiSuccess(jobTitle){
        cy.get('.orangehrm-container').should('contain', jobTitle);
    }

    verifySearchLocationOpsiSuccess(location){
        cy.get('.orangehrm-container').should('contain', location);
    }

    verifySearchNotFound(){
        cy.get('.orangehrm-horizontal-padding > .oxd-text').should('contain', 'No Records Found');
    }

};

export default new DirectoryPage();