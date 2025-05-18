class LoginPage {
    visit(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    };

    getUsernameField(){
        return cy.get('input[name="username"]');
    };

    getPasswordField(){
        return cy.get('input[name="password"]');
    };

    getLoginButton(){
        return cy.get('button[type="submit"]');
    };  
    getErrorMessage_1(){
        return cy.get(':nth-child(2) > .oxd-input-group > .oxd-text');
    };

    getErrorMessage_2(){
        return cy.get(':nth-child(3) > .oxd-input-group > .oxd-text');
    };

    getErrorMessage_3(){
        return cy.get('.oxd-alert-content > .oxd-text');
    };

    getLoginPageTitle(){
        return cy.get('h5[class="oxd-text oxd-text--h5 orangehrm-login-title"]');
    };

    login(username, password){
        this.getUsernameField().type(username);
        this.getPasswordField().type(password);
        this.getLoginButton().click();
    }

};

export default new LoginPage();