import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  bunSelector,
  ingredientSelector
} from '../../services/slices/burgerConstructor';
import { useNavigate } from 'react-router-dom';
import {
  clearUserOrder,
  setOrderLoading,
  userOrder,
  userOrderLoadingSelector,
  userOrderSelector
} from '../../services/slices/orders';
import { selectIsAuthVerified } from '../../services/slices/user';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAutificated = useSelector((state) =>
    selectIsAuthVerified(state.user)
  );
  const constructorItems = {
    bun: useSelector(bunSelector),
    ingredients: useSelector(ingredientSelector)
  };

  const orderRequest = useSelector(userOrderLoadingSelector);

  const orderModalData = useSelector(userOrderSelector);

  const ingredients = constructorItems.ingredients.map((i) => i._id);
  let fullIngredientList: string[];

  if (constructorItems.bun) {
    const { _id: bun } = constructorItems.bun;
    fullIngredientList = [bun, ...ingredients, bun];
  } else {
    fullIngredientList = ingredients;
  }

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) {
      alert('Добавьте булочки');
      return;
    } else if (isAutificated && constructorItems.bun) {
      dispatch(userOrder(fullIngredientList));
      console.log('Отправляемые данные заказа:', fullIngredientList);
      dispatch(setOrderLoading(true));
    } else {
      navigate('/login');
    }
  };
  const closeOrderModal = () => {
    dispatch(setOrderLoading(false));
    dispatch(clearUserOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
