import {
  burgerConstructorSlice,
  addIngredient,
  moveIngredientUp,
  moveIngredientDown,
  removeIngredient,
  initialState
} from './burgerConstructor';
import { TConstructorIngredient } from '../../utils/types';

describe('burgerConstructorSlice', () => {
  beforeEach(() => {
    initialState;
  });

  it('возвращать исходное состояние', () => {
    expect(burgerConstructorSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('обработка addIngredient для булочки', () => {
    const bun: TConstructorIngredient = {
      _id: '1',
      name: 'Bun',
      type: 'bun',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 1,
      image: 'image',
      image_large: 'image_large',
      image_mobile: 'image_mobile',
      id: 'bun-id'
    };
    const state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(bun)
    );
    expect(state.bun).toEqual(
      expect.objectContaining({ name: 'Bun', type: 'bun' })
    );
  });

  it('обрабатывать addIngredient для ингредиентов, не относящихся к булочкам', () => {
    const ingredient: TConstructorIngredient = {
      _id: '2',
      name: 'Ingredient',
      type: 'main',
      proteins: 20,
      fat: 20,
      carbohydrates: 20,
      calories: 200,
      price: 2,
      image: 'image',
      image_large: 'image_large',
      image_mobile: 'image_mobile',
      id: 'ingredient-id'
    };
    const state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredient)
    );
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(
      expect.objectContaining({ name: 'Ingredient', type: 'main' })
    );
  });

  it('обрабатывать moveIngredientUp', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        {
          _id: '1',
          id: '1',
          name: 'Ingredient 1',
          type: 'main',
          proteins: 10,
          fat: 10,
          carbohydrates: 10,
          calories: 100,
          price: 1,
          image: 'image',
          image_large: 'image_large',
          image_mobile: 'image_mobile'
        },
        {
          _id: '2',
          id: '2',
          name: 'Ingredient 2',
          type: 'main',
          proteins: 20,
          fat: 20,
          carbohydrates: 20,
          calories: 200,
          price: 2,
          image: 'image',
          image_large: 'image_large',
          image_mobile: 'image_mobile'
        }
      ]
    };
    const state = burgerConstructorSlice.reducer(
      stateWithIngredients,
      moveIngredientUp(1)
    );
    expect(state.ingredients[0].name).toBe('Ingredient 2');
    expect(state.ingredients[1].name).toBe('Ingredient 1');
  });

  it('обрабатывать moveIngredientDown', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        {
          _id: '1',
          id: '1',
          name: 'Ingredient 1',
          type: 'main',
          proteins: 10,
          fat: 10,
          carbohydrates: 10,
          calories: 100,
          price: 1,
          image: 'image',
          image_large: 'image_large',
          image_mobile: 'image_mobile'
        },
        {
          _id: '2',
          id: '2',
          name: 'Ingredient 2',
          type: 'main',
          proteins: 20,
          fat: 20,
          carbohydrates: 20,
          calories: 200,
          price: 2,
          image: 'image',
          image_large: 'image_large',
          image_mobile: 'image_mobile'
        }
      ]
    };
    const state = burgerConstructorSlice.reducer(
      stateWithIngredients,
      moveIngredientDown(0)
    );
    expect(state.ingredients[0].name).toBe('Ingredient 2');
    expect(state.ingredients[1].name).toBe('Ingredient 1');
  });

  it('обрабатывать removeIngredient', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        {
          _id: '1',
          id: '1',
          name: 'Ingredient 1',
          type: 'main',
          proteins: 10,
          fat: 10,
          carbohydrates: 10,
          calories: 100,
          price: 1,
          image: 'image',
          image_large: 'image_large',
          image_mobile: 'image_mobile'
        },
        {
          _id: '2',
          id: '2',
          name: 'Ingredient 2',
          type: 'main',
          proteins: 20,
          fat: 20,
          carbohydrates: 20,
          calories: 200,
          price: 2,
          image: 'image',
          image_large: 'image_large',
          image_mobile: 'image_mobile'
        }
      ]
    };
    const state = burgerConstructorSlice.reducer(
      stateWithIngredients,
      removeIngredient({ id: '1' })
    );
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].name).toBe('Ingredient 2');
  });
});
