import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { loginUserThunk } from '../../services/slices/user';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUserThunk({ email, password }));
      if (loginUserThunk.fulfilled.match(resultAction)) {
        navigate('/');
      } else {
        // Handle login failure if necessary
        alert('Неправильный логин или пароль');
        console.error('Login failed:', resultAction.payload);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
