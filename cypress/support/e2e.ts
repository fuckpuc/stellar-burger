import {
  SELECTOR_BREAD_BOTTOM,
  SELECTOR_BREAD_TOP,
  SELECTOR_INGREDIENT,
  BASE_URL
} from '../e2e/constructor.cy';

describe('Тестирование добавления ингредиентов в заказ', () => {
  it('Проверка увеличения счетчика ингредиента', () => {
    cy.get(SELECTOR_INGREDIENT).children('button').click();
  });

  describe('Добавление булок и начинки в заказ', () => {
    it('Добавление булки в заказ', () => {
      cy.get(SELECTOR_BREAD_TOP).children('button').click();
    });

    it('Добавление начинки', () => {
      cy.get(SELECTOR_INGREDIENT).children('button').click();
    });
  });

  describe('Замена булок', () => {
    it('Замена булки', () => {
      cy.get(SELECTOR_BREAD_TOP).children('button').click();
      cy.get(SELECTOR_BREAD_BOTTOM).children('button').click();
    });
  });
});

describe('Оформление заказа', () => {
  beforeEach(() => {
    window.localStorage.setItem('sessionToken', 'ipsum');
    cy.setCookie('authToken', 'lorem');
    cy.getAllLocalStorage().should('not.be.empty');
    cy.getCookie('authToken').should('exist');
  });

  afterEach(() => {
    window.localStorage.clear();
    cy.clearAllCookies();
    cy.getAllLocalStorage().should('be.empty');
    cy.getAllCookies().should('be.empty');
  });

  it('Отправка заказа', () => {
    cy.get(SELECTOR_BREAD_TOP).children('button').click();
    cy.get(SELECTOR_INGREDIENT).children('button').click();
    cy.get(`[data-cy='submit-order']`).click();
    cy.get('@popupWindow').find('h2').contains('42942');
    cy.intercept('POST', `${BASE_URL}/orders`, {
      fixture: 'order.json'
    });
  });
});

describe('Проверка модальных окон', () => {
  it('Открытие и проверка модального окна', () => {
    cy.get('@popupWindow').should('be.empty');
    cy.get(SELECTOR_INGREDIENT).children('a').click();
    cy.get('@popupWindow').should('not.be.empty');
    cy.url().should('include', '643d69a5c3f7b9001cfa0940');
  });

  it('Закрытие модального окна', () => {
    cy.get('@popupWindow').should('be.empty');
    cy.get(SELECTOR_INGREDIENT).children('a').click();
    cy.get('@popupWindow').should('not.be.empty');
    cy.get(`[data-cy='modal-overlay']`).click({ force: true });
    cy.get('@popupWindow').should('be.empty');
  });
});
