import { useNavigate } from 'react-router-dom';

const NewChatItem = () => {
  const navigate = useNavigate();
  return (
    <li className='mb-20' onClick={() => navigate('new-chat')}>
      <a
        href='#'
        className='flex text-sm items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
      >
        <i className='fa-solid fa-plus'></i>
        <span className='ms-3'>New Chat</span>
      </a>
    </li>
  );
};

export default NewChatItem;
