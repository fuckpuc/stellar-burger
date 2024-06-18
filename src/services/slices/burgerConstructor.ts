import { TConstructorIngredient } from '@utils-types';

import {
  createSelector,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from '../store';

interface BurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (ingredient: TConstructorIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      }
      // Добавьте другие редьюсеры по необходимости (например, для удаления ингредиентов)
    },
    moveIngredientUp(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index > 0 && index < state.ingredients.length) {
        const newIngredients = [...state.ingredients];
        [newIngredients[index - 1], newIngredients[index]] = [
          newIngredients[index],
          newIngredients[index - 1]
        ];
        state.ingredients = newIngredients;
      }
    },
    moveIngredientDown(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        const newIngredients = [...state.ingredients];
        [newIngredients[index + 1], newIngredients[index]] = [
          newIngredients[index],
          newIngredients[index + 1]
        ];
        state.ingredients = newIngredients;
      }
    },
    removeIngredient: (state, action: PayloadAction<{ id: string }>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} = burgerConstructorSlice.actions;

const selectConstructor = (state: RootState) => state.burgerConstructor;

export const bunSelector = createSelector(
  [selectConstructor],
  (item) => item.bun
);

export const ingredientSelector = createSelector(
  [selectConstructor],
  (item) => item.ingredients
);

// export default burgerConstructorSlice.reducer;
