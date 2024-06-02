import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
  useParams,
  useNavigate
} from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { loadIngredients } from '../../services/slices/ingredients';
import {
  verifyUserAuth,
  selectIsAuthVerified
} from '../../services/slices/user';

import { AppHeader, OrderInfo, IngredientDetails, Modal } from '@components';

const isAuthenticated = () => {
  const isAuth = useSelector((state) => selectIsAuthVerified(state.user));
  return isAuth;
};

interface ProtectedRouteProps {
  element: JSX.Element;
  requiresAuth: boolean;
}

// Компонент для защиты маршрутов
const ProtectedRoute = ({ element, requiresAuth }: ProtectedRouteProps) => {
  const auth = isAuthenticated();
  if (requiresAuth) {
    return auth ? element : <Navigate to='/login' />;
  } else {
    return !auth ? element : <Navigate to='/' />;
  }
};

const OrderInfoModal = () => {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    if (location.state && location.state.background) {
      navigate(-1);
    } else {
      navigate('/feed');
    }
  };

  return (
    <Modal title='Информация о заказе' onClose={handleClose}>
      {number && <OrderInfo orderNumber={number} />}
    </Modal>
  );
};

const IngredientsDetailsModal = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    if (location.state && location.state.background) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Modal title='Детали ингредиента' onClose={handleClose}>
      {id && <IngredientDetails />}
    </Modal>
  );
};

const ModalSwitch = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={<ProtectedRoute element={<Login />} requiresAuth={false} />}
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute element={<Register />} requiresAuth={false} />
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute element={<ForgotPassword />} requiresAuth={false} />
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute element={<ResetPassword />} requiresAuth={false} />
          }
        />
        <Route
          path='/profile'
          element={<ProtectedRoute element={<Profile />} requiresAuth />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute element={<ProfileOrders />} requiresAuth />}
        />
        <Route
          path='/profile/orders/:number'
          element={<ProtectedRoute element={<ProfileOrders />} requiresAuth />}
        />
        <Route path='/feed/:number' element={<Feed />} />
        <Route path='/ingredients/:id' element={<ConstructorPage />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route path='/profile/orders/:number' element={<OrderInfoModal />} />
          <Route path='/feed/:number' element={<OrderInfoModal />} />
          <Route
            path='/ingredients/:id'
            element={<IngredientsDetailsModal />}
          />
        </Routes>
      )}

      {!background && (
        <Routes>
          <Route path='/profile/orders/:number' element={<OrderInfoModal />} />
          <Route path='/feed/:number' element={<OrderInfoModal />} />
          <Route
            path='/ingredients/:id'
            element={<IngredientsDetailsModal />}
          />
        </Routes>
      )}
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadIngredients());
    dispatch(verifyUserAuth());
  }, [dispatch]);

  return (
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <ModalSwitch />
      </div>
    </Router>
  );
};

export default App;
