import { FC } from 'react';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';
import { ingredientsSlice } from '../../services/slices/ingredients';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const ingredientId = useParams();
  const ingredientData = useSelector((state) =>
    ingredientsSlice.selectors.selectIngredientById(state, ingredientId)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
