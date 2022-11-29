import axios from 'axios';

describe('Login user', () => {
    it("Get 200 status", () => {
        cy.request('POST', 'http://localhost:8080/user/login', {
            data: {
                email: 'janekane@uni.com',
                password: 'password',
            },
        })
    })
});