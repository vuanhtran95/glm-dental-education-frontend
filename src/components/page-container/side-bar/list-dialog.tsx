import { DialogDetail } from 'src/store/dialog/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';

interface Props {
  dialogs: DialogDetail[];
}

const ListDialog = ({ dialogs }: Props) => {
  const navigate = useNavigate();
  const params = useParams();

  const activeDialogId = useMemo(() => params.id, [params.id]);

  return (
    <div className='h-[70vh] overflow-y-auto'>
      <ul className='space-y-2 font-medium'>
        {dialogs.map((dialog: DialogDetail) => {
          return (
            <li
              key={dialog._id}
              onClick={() => {
                navigate(`/dialog/${dialog._id}`);
              }}
            >
              <a
                href='#'
                className={`${
                  activeDialogId === dialog._id && 'bg-gray-700'
                } flex items-center p-1 text-gray-900 rounded-lg dark:text-white 
                hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <i className='fa-regular fa-message'></i>
                <span className='flex-1 ms-3 whitespace-nowrap text-sm'>
                  {dialog.scenario.patientName}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListDialog;
