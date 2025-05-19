class ResetPassPage{
    visit(){
        cy.visit('/auth/requestPasswordResetCode')
    }

    getCancelButton(){
        return cy.get('.oxd-button--ghost');
    }

    getResetButton(){
        return cy.get('.oxd-button--secondary');
    }

    getUsernameField(){ 
        return cy.get('.oxd-input');
    }

    verifyResetPassPageTitle(){
        cy.get('.oxd-text--h6').should('contain', 'Reset Password');
    }

    verifyFieldUsername(){
        this.getUsernameField().should('be.visible');
    }

    verifyButtonCancel(){
        this.getCancelButton().should('be.visible');
    }

    verifyButtonReset(){
        this.getResetButton().should('be.visible');
    }

    inputUsername(username){
        this.getUsernameField().clear().type(username);
    }

    verifyUsernameRequiredError(){
        cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('contain', 'Required');
    }

    resetButton(){
        this.getResetButton().click();
    }

    cancelButton(){
        this.getCancelButton().click();
    }

    verifyResetPasswordSuccess(){
        cy.get('.oxd-text--h6').should('contain', 'Reset Password link sent successfully');
        cy.url().should('include', '/auth/sendPasswordReset');
    }
};

export default new ResetPassPage()