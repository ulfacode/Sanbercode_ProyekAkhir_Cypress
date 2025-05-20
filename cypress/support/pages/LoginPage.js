class LoginPage {
    visit(){
        cy.visit('/auth/login');
    };

    getUsernameInput(){
        return cy.get('input[name="username"]');
    };
    
    getPasswordInput(){
        return cy.get('input[name="password"]');
    };

    getLoginButton(){
        return cy.get('button[type="submit"]');
    }

    verifyFieldUsername(){
        this.getUsernameInput().should('be.visible');
    };

    verifyFieldPassword(){
        this.getPasswordInput().should('be.visible');
    };

    verifyButtonLogin(){
        this.getLoginButton().should('be.visible');
    }   

    inputUsername(username){
        this.getUsernameInput().clear().type(username);
    };

    inputPassword(password){
        this.getPasswordInput().clear().type(password);
    };

    clickLoginButton(){
        this.getLoginButton().click();
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
        cy.get('.oxd-text--h5').should('contain', 'Login');
    };
    

    verifyLoginSuccess(){
        cy.url().should('include', '/dashboard');
    }

};

export default new LoginPage();