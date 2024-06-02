import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchUserOrdersThunk,
  selectUserOrderHistory
} from '../../services/slices/user';
import { getFeeds } from '../../services/slices/feed';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserOrdersThunk());
    dispatch(getFeeds());
  }, []);
  const orders: TOrder[] = useSelector((state) =>
    selectUserOrderHistory(state.user)
  );

  return <ProfileOrdersUI orders={orders} />;
};
