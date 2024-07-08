import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>Not Found</div>
      <a onClick={() => navigate('/')}>Back to home</a>
    </div>
  );
};

export default NotFound;
