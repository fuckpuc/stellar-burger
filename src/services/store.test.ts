import store from './store';
import { rootReducer } from './rootReducer';

// Тест для инициализации стора
describe('Инициализация стора', () => {
  test('инициализировать стор с помощью rootReducer', () => {
    const state = store.getState();
    const expectedState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(expectedState);
  });
});

// Тесты для проверки начальных значений редьюсеров
describe('Исходное состояние', () => {
  test('инициализировать стор с помощью rootReducer', () => {
    const state = store.getState().user;
    expect(state).toEqual({
      errorMsg: null,
      isAuthVerified: false,
      isOrderRequesting: false,
      isUserRequesting: false,
      registrationInfo: null,
      userInfo: null,
      userOrderHistory: []
    });
  });

  test('должен иметь начальное состояние для ingredientsSlice', () => {
    const state = store.getState().ingredients;
    expect(state).toEqual({
      buns: [],
      error: null,
      ingredients: [],
      isLoading: false,
      mains: [],
      sauces: []
    });
  });

  test('должен иметь начальное состояние для burgerConstructorSlice', () => {
    const state = store.getState().burgerConstructor;
    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('должен иметь начальное состояние для feedSlice', () => {
    const state = store.getState().feed;
    expect(state).toEqual({
      error: null,
      loading: false,
      orders: [],
      total: 0,
      totalToday: 0
    });
  });

  test('должен иметь начальное состояние для orderSlice', () => {
    const state = store.getState().orders;
    expect(state).toEqual({
      error: null,
      loading: false,
      order: null,
      orderError: null,
      orderLoading: false,
      orders: [],
      userOrder: null
    });
  });
});
