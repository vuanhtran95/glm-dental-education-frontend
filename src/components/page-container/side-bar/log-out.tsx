import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from 'src/constants';

const LogOut = () => {
  const navigate = useNavigate();

  return (
    <p onClick={() => navigate(APP_ROUTES.LOGIN)} className='mt-8'>
      <i className='fa-solid fa-right-from-bracket' /> Log out
    </p>
  );
};

export default LogOut;
