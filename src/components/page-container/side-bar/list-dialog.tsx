import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dialogs: Array<any>;
}

const ListDialog = ({ dialogs }: Props) => {
  const navigate = useNavigate();
  const params = useParams();

  const activeDialogId = useMemo(() => params.id, [params.id]);

  return (
    <div className='h-[70vh] overflow-y-auto'>
      <ul className='space-y-2 font-medium'>
        {dialogs.map((dialog) => {
          return (
            <li
              key={dialog.id}
              onClick={() => {
                navigate(`/dialog/${dialog.id}`);
              }}
            >
              <a
                href='#'
                className={`${
                  activeDialogId === dialog.id && 'bg-gray-700'
                } flex items-center p-1 text-gray-900 rounded-lg dark:text-white 
                hover:bg-gray-100 dark:hover:bg-gray-700 group justify-between`}
              >
                <i className='fa-regular fa-message'></i>
                <span className='flex-1 ms-3 whitespace-nowrap text-sm'>
                  {dialog.patientName}
                  {dialog.isSubmitted && (
                    <i className='fa-solid fa-circle-check ml-2 text-green-500' />
                  )}
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
