export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const SELECTOR_BREAD_TOP = `[data-cy=${'643d69a5c3f7b9001cfa093d'}]`;
export const SELECTOR_BREAD_BOTTOM = `[data-cy=${'643d69a5c3f7b9001cfa093c'}]`;
export const SELECTOR_INGREDIENT = `[data-cy=${'643d69a5c3f7b9001cfa0940'}]`;

beforeEach(() => {
  cy.intercept('GET', `${BASE_URL}/ingredients`, {
    fixture: 'ingredients.json'
  });
  cy.intercept('POST', `${BASE_URL}/auth/login`, {
    fixture: 'user.json'
  });
  cy.intercept('GET', `${BASE_URL}/auth/user`, {
    fixture: 'user.json'
  });
  cy.intercept('POST', `${BASE_URL}/orders`, {
    fixture: 'order.json'
  });
  cy.visit('/');
  cy.get('#modals').as('popupWindow');
  cy.viewport(1440, 900);
});
