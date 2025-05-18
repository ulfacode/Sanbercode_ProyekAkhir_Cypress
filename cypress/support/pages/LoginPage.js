class LoginPage {
    visit(){
        cy.visit('/auth/login');
    };

    inputUsername(username){
        cy.get('input[name="username"]').clear().type(username);
    };

    inputPassword(password){
        cy.get('input[name="password"]').clear().type(password);
    };

    LoginButton(){
        cy.get('button[type="submit"]').click();
    };  
    verifyUsernameRequiredError(){
        cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('contain', 'Required');;
    };

    verifyPasswordRequiredError(){
        cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('contain', 'Required');;
    };

    verifyInvalidLogin(){
        cy.get('.oxd-alert-content > .oxd-text').should('contain', 'Invalid credentials');
    };

    verifyLoginPageTitle(){
        cy.get('h5[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('contain', 'Login');
    };
    
    verifyFieldUsername(){
        cy.get('input[name="username"]').should('be.visible');
    };

    verifyFieldPassword(){
        cy.get('input[name="password"]').should('be.visible');
    };

    verifyButtonLogin(){
        cy.get('button[type="submit"]').should('be.visible');
    }   

    verifyLoginSuccess(){
        cy.url().should('include', '/dashboard');
    }
   

};

export default new LoginPage();