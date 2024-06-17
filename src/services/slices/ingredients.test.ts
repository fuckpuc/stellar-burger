import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, ingredientStateInterface } from '../../utils/types';
import { ingredientsSlice, loadIngredients, initialState } from './ingredients';

describe('ingredientsSlice reducer', () => {
  it('возвращать начальное состояние', () => {
    expect(ingredientsSlice.reducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('должен обрабатывать loadIngredients.pending', () => {
    const action = { type: loadIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('должен обрабатывать loadIngredients.fulfilled', () => {
    const mockData: TIngredient[] = [
      {
        _id: '1',
        name: 'Bun',
        type: 'bun',
        proteins: 10,
        fat: 20,
        carbohydrates: 30,
        calories: 200,
        price: 50,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        _id: '2',
        name: 'Sauce',
        type: 'sauce',
        proteins: 5,
        fat: 10,
        carbohydrates: 15,
        calories: 100,
        price: 25,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        _id: '3',
        name: 'Main',
        type: 'main',
        proteins: 15,
        fat: 30,
        carbohydrates: 45,
        calories: 300,
        price: 75,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ];

    const action = { type: loadIngredients.fulfilled.type, payload: mockData };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      ingredients: mockData,
      buns: [mockData[0]],
      sauces: [mockData[1]],
      mains: [mockData[2]]
    });
  });

  it('должен обрабатывать loadIngredients.rejected', () => {
    const action = { type: loadIngredients.rejected.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false
    });
  });
});
