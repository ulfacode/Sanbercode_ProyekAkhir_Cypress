class ResetPassPage{
    visit(){
        cy.visit('/auth/requestPasswordResetCode')
    }

    verifyResetPassPageTitle(){
        cy.get('.oxd-text--h6').should('contain', 'Reset Password');
    }

    verifyFieldUsername(){
        cy.get('.oxd-input').should('be.visible');
    }

    verifyButtonCancel(){
        cy.get('.oxd-button--ghost').should('be.visible');
    }

    verifyButtonReset(){
        cy.get('.oxd-button--secondary').should('be.visible');
    }

    inputUsername(username){
        cy.get('.oxd-input').clear().type(username);
    }

    verifyUsernameRequiredError(){
        cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('contain', 'Required');
    }

    resetButton(){
        cy.get('.oxd-button--secondary').click();
    }

    cancelButton(){
        cy.get('.oxd-button--ghost').click();
    }

    verifyResetPasswordSuccess(){
        cy.get('.oxd-text--h6').should('contain', 'Reset Password link sent successfully');
        cy.url().should('include', '/auth/sendPasswordReset');
    }
};

export default new ResetPassPage()